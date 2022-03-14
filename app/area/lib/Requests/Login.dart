import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Login {
  Future<bool> login(String email, String password) async {
    var sharedPreferences = await SharedPreferences.getInstance();
    var server_ip = sharedPreferences.getString("server_ip") ?? "";

    var response = await http.post(
      Uri.parse(server_ip + "/login"),
      body: <String, String>{'email': email, 'password': password},
    );

    if (response.statusCode == 201) {
      dynamic token = response.body;
      sharedPreferences.setString("token", token);
      return true;
    } else {
      return false;
    }
  }

  Future<bool> register(String email, String password, String name) async {
    var sharedPreferences = await SharedPreferences.getInstance();
    var server_ip = sharedPreferences.getString("server_ip") ?? "";

    var response = await http.post(
      Uri.parse(server_ip + "/register"),
      body: <String, String>{
        'name': name,
        'email': email,
        'password': password
      },
    );

    if (response.statusCode == 201) {
      dynamic token = response.body;
      sharedPreferences.setString("token", token);
      return true;
    } else {
      return false;
    }
  }
}
