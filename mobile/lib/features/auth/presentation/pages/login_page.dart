import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/auth_provider.dart';
import '../states/auth_state.dart';

class LoginPage extends ConsumerStatefulWidget {
  final VoidCallback onLoginSuccess;
  final VoidCallback onNavigateToRegister;

  const LoginPage({
    Key? key,
    required this.onLoginSuccess,
    required this.onNavigateToRegister,
  }) : super(key: key);

  @override
  ConsumerState<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends ConsumerState<LoginPage> {
  late TextEditingController _emailController;
  late TextEditingController _passwordController;
  bool _rememberMe = false;

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleLogin() {
    final email = _emailController.text.trim();
    final password = _passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill all fields')),
      );
      return;
    }

    ref.read(authStateProvider.notifier).login(
          email: email,
          password: password,
          rememberMe: _rememberMe,
        );
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authStateProvider);

    // Listen to auth state changes
    ref.listen(authStateProvider, (previous, next) {
      if (next.isAuthenticated) {
        widget.onLoginSuccess();
      } else if (next.isError) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(next.errorMessage ?? 'An error occurred')),
        );
      }
    });

    return Scaffold(
      appBar: AppBar(title: const Text('Login')),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 40),
              const Text(
                'Welcome Back',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 40),
              TextField(
                controller: _emailController,
                decoration: InputDecoration(
                  labelText: 'Email',
                  hintText: 'Enter your email',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  prefixIcon: const Icon(Icons.email),
                ),
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _passwordController,
                decoration: InputDecoration(
                  labelText: 'Password',
                  hintText: 'Enter your password',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  prefixIcon: const Icon(Icons.lock),
                ),
                obscureText: true,
              ),
              const SizedBox(height: 16),
              CheckboxListTile(
                value: _rememberMe,
                onChanged: (value) {
                  setState(() {
                    _rememberMe = value ?? false;
                  });
                },
                title: const Text('Remember me'),
                controlAffinity: ListTileControlAffinity.leading,
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: authState.isLoading ? null : _handleLogin,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 14),
                ),
                child: authState.isLoading
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                        ),
                      )
                    : const Text('Login'),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Don't have an account? "),
                  TextButton(
                    onPressed: widget.onNavigateToRegister,
                    child: const Text('Sign up'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
