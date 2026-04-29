import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'features/auth/presentation/pages/auth_wrapper.dart';
import 'features/home/presentation/pages/home_page.dart';
import 'features/auth/presentation/providers/auth_provider.dart';

void main() {
  runApp(const ProviderScope(child: MainApp()));
}

class MainApp extends ConsumerStatefulWidget {
  const MainApp({super.key});

  @override
  ConsumerState<MainApp> createState() => _MainAppState();
}

class _MainAppState extends ConsumerState<MainApp> {
  bool _isAuthenticated = false;

  @override
  void initState() {
    super.initState();
    _checkAuthStatus();
  }

  void _checkAuthStatus() {
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      final isLoggedIn = await ref
          .read(authStateProvider.notifier)
          .checkAuthStatus();
      final authState = ref.read(authStateProvider);
      
      setState(() {
        _isAuthenticated = authState.isAuthenticated;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authStateProvider);

    // Update authentication state when it changes
    ref.listen(authStateProvider, (previous, next) {
      setState(() {
        _isAuthenticated = next.isAuthenticated;
      });
    });

    return MaterialApp(
      title: 'My Cloud Apps',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: _isAuthenticated || authState.isAuthenticated
          ? HomePage(
              onLogout: () {
                setState(() {
                  _isAuthenticated = false;
                });
              },
            )
          : AuthWrapper(
              onAuthSuccess: () {
                setState(() {
                  _isAuthenticated = true;
                });
              },
            ),
    );
  }
}
