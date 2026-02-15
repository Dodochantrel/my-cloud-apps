import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../shared/models/user_model.dart';
import '../../data/models/login_request_model.dart';
import '../../data/repositories/auth_repository_impl.dart';

final loginUsecaseProvider = Provider<LoginUsecase>((ref) {
  final authRepository = ref.watch(authRepositoryProvider);
  return LoginUsecase(authRepository);
});

class LoginUsecase {
  final AuthRepository authRepository;

  LoginUsecase(this.authRepository);

  Future<UserModel> call({
    required String email,
    required String password,
    bool rememberMe = false,
  }) async {
    final request = LoginRequestModel(
      email: email,
      password: password,
      rememberMe: rememberMe,
    );

    return await authRepository.login(request);
  }
}
