import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../../../features/auth/presentation/providers/auth_provider.dart';

class HomePage extends ConsumerWidget {
  final VoidCallback onLogout;

  const HomePage({
    Key? key,
    required this.onLogout,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authStateProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              _showLogoutDialog(context, ref);
            },
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Welcome, ${authState.user?.email ?? 'User'}!',
              style: const TextStyle(fontSize: 20),
            ),
            const SizedBox(height: 20),
            const Text('You are successfully logged in'),
          ],
        ),
      ),
    );
  }

  void _showLogoutDialog(BuildContext context, WidgetRef ref) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Logout'),
        content: const Text('Are you sure you want to logout?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              ref.read(authStateProvider.notifier).logout();
              Navigator.pop(context);
              onLogout();
            },
            child: const Text('Logout'),
          ),
        ],
      ),
    );
  }
}
