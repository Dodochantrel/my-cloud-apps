import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../shared/models/user_model.dart';

enum AuthStatus {
  initial,
  loading,
  authenticated,
  unauthenticated,
  error,
  registerSuccess,
}

class AuthState {
  final AuthStatus status;
  final UserModel? user;
  final String? errorMessage;

  const AuthState({
    required this.status,
    this.user,
    this.errorMessage,
  });

  const AuthState.initial()
      : status = AuthStatus.initial,
        user = null,
        errorMessage = null;

  const AuthState.loading()
      : status = AuthStatus.loading,
        user = null,
        errorMessage = null;

  const AuthState.authenticated(UserModel user)
      : status = AuthStatus.authenticated,
        user = user,
        errorMessage = null;

  const AuthState.unauthenticated()
      : status = AuthStatus.unauthenticated,
        user = null,
        errorMessage = null;

  const AuthState.error(String message)
      : status = AuthStatus.error,
        user = null,
        errorMessage = message;

  const AuthState.registerSuccess()
      : status = AuthStatus.registerSuccess,
        user = null,
        errorMessage = null;

  bool get isLoading => status == AuthStatus.loading;
  bool get isAuthenticated => status == AuthStatus.authenticated;
  bool get isError => status == AuthStatus.error;
  bool get isRegisterSuccess => status == AuthStatus.registerSuccess;
}
