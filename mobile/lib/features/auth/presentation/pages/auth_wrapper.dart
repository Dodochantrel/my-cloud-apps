import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/auth_provider.dart';
import 'login_page.dart';
import 'register_page.dart';

class AuthWrapper extends ConsumerStatefulWidget {
  final VoidCallback onAuthSuccess;

  const AuthWrapper({
    Key? key,
    required this.onAuthSuccess,
  }) : super(key: key);

  @override
  ConsumerState<AuthWrapper> createState() => _AuthWrapperState();
}

class _AuthWrapperState extends ConsumerState<AuthWrapper> {
  bool _showLoginPage = true;

  @override
  void initState() {
    super.initState();
    _checkAuthStatus();
  }

  void _checkAuthStatus() {
    ref.read(authStateProvider.notifier).checkAuthStatus();
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authStateProvider);

    // If authenticated, call the success callback
    if (authState.isAuthenticated) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        widget.onAuthSuccess();
      });
    }

    return _showLoginPage
        ? LoginPage(
            onLoginSuccess: widget.onAuthSuccess,
            onNavigateToRegister: () {
              setState(() {
                _showLoginPage = false;
              });
            },
          )
        : RegisterPage(
            onRegisterSuccess: () {
              setState(() {
                _showLoginPage = true;
              });
            },
            onNavigateToLogin: () {
              setState(() {
                _showLoginPage = true;
              });
            },
          );
  }
}
