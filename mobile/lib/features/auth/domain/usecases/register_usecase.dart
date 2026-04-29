import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/register_request_model.dart';
import '../../data/repositories/auth_repository_impl.dart';

final registerUsecaseProvider = Provider<RegisterUsecase>((ref) {
  final authRepository = ref.watch(authRepositoryProvider);
  return RegisterUsecase(authRepository);
});

class RegisterUsecase {
  final AuthRepository authRepository;

  RegisterUsecase(this.authRepository);

  Future<void> call({
    required String email,
    required String password,
    String? firstName,
    String? lastName,
  }) async {
    final request = RegisterRequestModel(
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    );

    return await authRepository.register(request);
  }
}
