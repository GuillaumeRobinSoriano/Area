import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class UserInfo {
  final String email;
  final String name;
  final String password;
  final String data;
  final String id;

  UserInfo(this.email, this.name, this.password, this.data, this.id);
}

class Profile {
  Future<Map<String, dynamic>?> getUserInfo() async {
    var sharedPreferences = await SharedPreferences.getInstance();
    var server_ip = sharedPreferences.getString("server_ip") ?? "";
    sharedPreferences.getString("token");

    var response = await http.get(
      Uri.parse(server_ip + "/users/userInfo"),
      headers: {"jwt": sharedPreferences.getString("token").toString()},
    );

    if (response.statusCode == 200) {
      Map<String, dynamic> body = json.decode(response.body);
      return body;
    } else {
      return null;
    }
  }

  Future<bool> patchUserName(String name) async {
    var sharedPreferences = await SharedPreferences.getInstance();
    var server_ip = sharedPreferences.getString("server_ip") ?? "";
    sharedPreferences.getString("token");

    var response = await http.patch(
      Uri.parse(server_ip + "/users/setName"),
      headers: {"jwt": sharedPreferences.getString("token").toString()},
      body: <String, String>{
        'name': name,
      },
    );

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }

  Future<bool> patchUserPicture(String picture) async {
    var sharedPreferences = await SharedPreferences.getInstance();
    var server_ip = sharedPreferences.getString("server_ip") ?? "";
    sharedPreferences.getString("token");

    var response = await http.patch(
      Uri.parse(server_ip + "/users/setPicture"),
      headers: {"jwt": sharedPreferences.getString("token").toString()},
      body: <String, String>{
        'picture': picture,
      },
    );

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }

  Future<bool> patchUserBanner(String banner) async {
    var sharedPreferences = await SharedPreferences.getInstance();
    var server_ip = sharedPreferences.getString("server_ip") ?? "";
    sharedPreferences.getString("token");

    var response = await http.patch(
      Uri.parse(server_ip + "/users/setBanner"),
      headers: {"jwt": sharedPreferences.getString("token").toString()},
      body: <String, String>{
        'banner': banner,
      },
    );

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }

  Future<bool> patchUserDescription(String description) async {
    var sharedPreferences = await SharedPreferences.getInstance();
    var server_ip = sharedPreferences.getString("server_ip") ?? "";
    sharedPreferences.getString("token");

    var response = await http.patch(
      Uri.parse(server_ip + "/users/setDescription"),
      headers: {"jwt": sharedPreferences.getString("token").toString()},
      body: <String, String>{
        'description': description,
      },
    );

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }
}
