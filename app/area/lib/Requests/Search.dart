import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class SearchItem {
  final String name;
  final String description;
  final Color color;
  final String logoPath;
  final List<dynamic> req;

  SearchItem(this.description, this.color, this.logoPath, this.req, this.name);
}

class Search {
  Future<List<SearchItem>> getActionsList(String query) async {
    var sharedPreferences = await SharedPreferences.getInstance();
    var server_ip = sharedPreferences.getString("server_ip") ?? "";

    var response = await http.get(
        Uri.parse(server_ip + "/getActions?word=" + query),
        headers: <String, String>{
          "jwt": (sharedPreferences.getString("token") ?? ""),
        });

    if (response.statusCode == 200) {
      dynamic body = json.decode(response.body);
      List<SearchItem> list = List.generate(body.length, (int index) {
        return SearchItem(
            body[index]["description"],
            Color.fromRGBO(
              int.parse(body[index]["color"]["r"]),
              int.parse(body[index]["color"]["g"]),
              int.parse(body[index]["color"]["b"]),
              double.parse(body[index]["color"]["o"]),
            ),
            body[index]["assets"],
            body[index]["req"],
            body[index]["name"]);
      });
      return list;
    } else {
      return List.empty();
    }
  }

  Future<List<SearchItem>> getReactionsList(String query) async {
    var sharedPreferences = await SharedPreferences.getInstance();
    var server_ip = sharedPreferences.getString("server_ip") ?? "";

    var response = await http.get(
        Uri.parse(server_ip + "/getReactions?word=" + query),
        headers: <String, String>{
          "jwt": (sharedPreferences.getString("token") ?? ""),
        });

    if (response.statusCode == 200) {
      dynamic body = json.decode(response.body);
      List<SearchItem> list = List.generate(body.length, (int index) {
        return SearchItem(
            body[index]["description"],
            Color.fromRGBO(
              int.parse(body[index]["color"]["r"]),
              int.parse(body[index]["color"]["g"]),
              int.parse(body[index]["color"]["b"]),
              double.parse(body[index]["color"]["o"]),
            ),
            body[index]["assets"],
            body[index]["req"],
            body[index]["name"]);
      });
      return list;
    } else {
      return List.empty();
    }
  }
}
