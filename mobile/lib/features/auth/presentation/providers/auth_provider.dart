import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/exceptions/auth_exceptions.dart';
import '../../../../shared/models/user_model.dart';
import '../states/auth_state.dart';
import '../../domain/usecases/login_usecase.dart';
import '../../domain/usecases/register_usecase.dart';
import '../../domain/usecases/logout_usecase.dart';
import '../../domain/usecases/check_auth_status_usecase.dart';

final authStateProvider =
    StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final loginUsecase = ref.watch(loginUsecaseProvider);
  final registerUsecase = ref.watch(registerUsecaseProvider);
  final logoutUsecase = ref.watch(logoutUsecaseProvider);
  final checkAuthStatusUsecase = ref.watch(checkAuthStatusUsecaseProvider);

  return AuthNotifier(
    loginUsecase,
    registerUsecase,
    logoutUsecase,
    checkAuthStatusUsecase,
  );
});

class AuthNotifier extends StateNotifier<AuthState> {
  final LoginUsecase loginUsecase;
  final RegisterUsecase registerUsecase;
  final LogoutUsecase logoutUsecase;
  final CheckAuthStatusUsecase checkAuthStatusUsecase;

  AuthNotifier(
    this.loginUsecase,
    this.registerUsecase,
    this.logoutUsecase,
    this.checkAuthStatusUsecase,
  ) : super(const AuthState.initial());

  Future<void> login({
    required String email,
    required String password,
    bool rememberMe = false,
  }) async {
    state = const AuthState.loading();

    try {
      final user = await loginUsecase(
        email: email,
        password: password,
        rememberMe: rememberMe,
      );

      state = AuthState.authenticated(user);
    } on InvalidCredentialsException catch (e) {
      state = AuthState.error(e.message);
    } on NetworkException catch (e) {
      state = AuthState.error(e.message);
    } on AuthException catch (e) {
      state = AuthState.error(e.message);
    } catch (e) {
      state = AuthState.error('An unexpected error occurred');
    }
  }

  Future<void> register({
    required String email,
    required String password,
    String? firstName,
    String? lastName,
  }) async {
    state = const AuthState.loading();

    try {
      await registerUsecase(
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      );

      state = const AuthState.registerSuccess();
    } on NetworkException catch (e) {
      state = AuthState.error(e.message);
    } on AuthException catch (e) {
      state = AuthState.error(e.message);
    } catch (e) {
      state = AuthState.error('An unexpected error occurred');
    }
  }

  Future<void> logout() async {
    try {
      await logoutUsecase();
      state = const AuthState.initial();
    } on AuthException catch (e) {
      state = AuthState.error(e.message);
    }
  }

  Future<void> checkAuthStatus() async {
    try {
      final isLoggedIn = await checkAuthStatusUsecase();

      if (!isLoggedIn) {
        state = const AuthState.unauthenticated();
      }
      // If logged in, keep current state or load user
    } on AuthException catch (e) {
      state = AuthState.error(e.message);
    }
  }
}
