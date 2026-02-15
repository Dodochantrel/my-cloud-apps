import 'package:json_annotation/json_annotation.dart';

part 'login_request_model.g.dart';

@JsonSerializable()
class LoginRequestModel {
  final String email;
  final String password;
  @JsonKey(defaultValue: false)
  final bool rememberMe;

  LoginRequestModel({
    required this.email,
    required this.password,
    this.rememberMe = false,
  });

  factory LoginRequestModel.fromJson(Map<String, dynamic> json) =>
      _$LoginRequestModelFromJson(json);

  Map<String, dynamic> toJson() => _$LoginRequestModelToJson(this);
}
