import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/repositories/auth_repository_impl.dart';

final logoutUsecaseProvider = Provider<LogoutUsecase>((ref) {
  final authRepository = ref.watch(authRepositoryProvider);
  return LogoutUsecase(authRepository);
});

class LogoutUsecase {
  final AuthRepository authRepository;

  LogoutUsecase(this.authRepository);

  Future<void> call() async {
    return await authRepository.logout();
  }
}
