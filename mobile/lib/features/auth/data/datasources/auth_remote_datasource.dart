import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/exceptions/auth_exceptions.dart';
import '../../../../core/network/dio_client.dart';
import '../../../../shared/models/auth_response_model.dart';
import '../models/login_request_model.dart';
import '../models/register_request_model.dart';

final authRemoteDatasourceProvider =
    Provider<AuthRemoteDatasource>((ref) {
  final dio = ref.watch(dioProvider);
  return AuthRemoteDatasource(dio);
});

class AuthRemoteDatasource {
  final Dio dio;

  AuthRemoteDatasource(this.dio);

  Future<void> register(RegisterRequestModel request) async {
    try {
      await dio.post(
        '/authentications/register',
        data: request.toJson(),
      );
    } on DioException catch (e) {
      _handleError(e);
    } catch (e) {
      throw ServerException(e.toString());
    }
  }

  Future<AuthResponseModel> login(LoginRequestModel request) async {
    try {
      final response = await dio.post(
        '/authentications/login',
        data: request.toJson(),
      );

      // Extract tokens from response and cookies
      return AuthResponseModel.fromJson(response.data);
    } on DioException catch (e) {
      _handleError(e);
    } catch (e) {
      throw ServerException(e.toString());
    }
  }

  Future<String> refreshToken(String refreshToken) async {
    try {
      final response = await dio.post(
        '/authentications/refresh',
        options: Options(
          headers: {
            'Authorization': 'Bearer $refreshToken',
          },
        ),
      );

      return response.data['accessToken'] ?? '';
    } on DioException catch (e) {
      _handleError(e);
    } catch (e) {
      throw ServerException(e.toString());
    }
  }

  void _handleError(DioException e) {
    if (e.type == DioExceptionType.connectionTimeout ||
        e.type == DioExceptionType.receiveTimeout) {
      throw NetworkException();
    } else if (e.response?.statusCode == 401) {
      throw UnauthorizedException();
    } else if (e.response?.statusCode == 400) {
      throw InvalidCredentialsException(
        e.response?.data['message'] ?? 'Invalid credentials',
      );
    } else if (e.response?.statusCode == 500) {
      throw ServerException();
    } else {
      throw NetworkException(e.message);
    }
  }
}
