import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/repositories/auth_repository_impl.dart';

final checkAuthStatusUsecaseProvider = Provider<CheckAuthStatusUsecase>((ref) {
  final authRepository = ref.watch(authRepositoryProvider);
  return CheckAuthStatusUsecase(authRepository);
});

class CheckAuthStatusUsecase {
  final AuthRepository authRepository;

  CheckAuthStatusUsecase(this.authRepository);

  Future<bool> call() async {
    return await authRepository.isLoggedIn();
  }
}
