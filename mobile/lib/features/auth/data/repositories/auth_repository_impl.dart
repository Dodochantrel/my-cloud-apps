import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../core/exceptions/auth_exceptions.dart';
import '../../../../core/services/secure_storage_service.dart';
import '../../../../shared/models/auth_response_model.dart';
import '../../../../shared/models/user_model.dart';
import '../datasources/auth_remote_datasource.dart';
import '../models/login_request_model.dart';
import '../models/register_request_model.dart';

abstract class AuthRepository {
  Future<void> register(RegisterRequestModel request);
  Future<UserModel> login(LoginRequestModel request);
  Future<String> refreshToken();
  Future<void> logout();
  Future<UserModel?> getCurrentUser();
  Future<bool> isLoggedIn();
}

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  final remoteDatasource = ref.watch(authRemoteDatasourceProvider);
  final secureStorage = ref.watch(secureStorageProvider);
  return AuthRepositoryImpl(remoteDatasource, secureStorage);
});

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDatasource remoteDatasource;
  final SecureStorageService secureStorage;

  AuthRepositoryImpl(this.remoteDatasource, this.secureStorage);

  @override
  Future<void> register(RegisterRequestModel request) async {
    try {
      await remoteDatasource.register(request);
    } on AuthException {
      rethrow;
    }
  }

  @override
  Future<UserModel> login(LoginRequestModel request) async {
    try {
      final response = await remoteDatasource.login(request);

      // Save tokens securely
      await secureStorage.saveToken(
        AppConstants.accessTokenKey,
        response.accessToken,
      );
      await secureStorage.saveToken(
        AppConstants.refreshTokenKey,
        response.refreshToken,
      );

      return response.user ?? UserModel(
        id: '',
        email: request.email,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );
    } on AuthException {
      rethrow;
    }
  }

  @override
  Future<String> refreshToken() async {
    try {
      final refreshToken =
          await secureStorage.getToken(AppConstants.refreshTokenKey);

      if (refreshToken == null) {
        throw TokenException('No refresh token found');
      }

      final newAccessToken = await remoteDatasource.refreshToken(refreshToken);
      await secureStorage.saveToken(
        AppConstants.accessTokenKey,
        newAccessToken,
      );

      return newAccessToken;
    } on AuthException {
      rethrow;
    }
  }

  @override
  Future<void> logout() async {
    try {
      await secureStorage.deleteAllTokens();
    } catch (e) {
      throw ServerException('Failed to logout');
    }
  }

  @override
  Future<UserModel?> getCurrentUser() async {
    // This would typically fetch from API or local storage
    // For now, returning null
    return null;
  }

  @override
  Future<bool> isLoggedIn() async {
    final accessToken =
        await secureStorage.getToken(AppConstants.accessTokenKey);
    return accessToken != null && accessToken.isNotEmpty;
  }
}
