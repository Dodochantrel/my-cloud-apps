abstract class AuthException implements Exception {
  final String message;
  AuthException(this.message);

  @override
  String toString() => message;
}

class UnauthorizedException extends AuthException {
  UnauthorizedException([String? message])
      : super(message ?? 'Unauthorized access');
}

class InvalidCredentialsException extends AuthException {
  InvalidCredentialsException([String? message])
      : super(message ?? 'Invalid email or password');
}

class NetworkException extends AuthException {
  NetworkException([String? message])
      : super(message ?? 'Network error. Please check your connection');
}

class ServerException extends AuthException {
  ServerException([String? message])
      : super(message ?? 'Server error. Please try again later');
}

class TokenException extends AuthException {
  TokenException([String? message])
      : super(message ?? 'Token error. Please login again');
}
