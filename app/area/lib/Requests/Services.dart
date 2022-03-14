import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import 'Search.dart';

class HomeItem {
  final String actionName;
  final String actionParams;
  final String reactionName;
  final String reactionParams;
  final String trigger;
  final String triggerParam;
  final int idAREA;

  HomeItem(this.actionName, this.actionParams, this.reactionName,
      this.reactionParams, this.trigger, this.triggerParam, this.idAREA);
}

class Services {
  Future<bool> setService(
    SearchItem action,
    SearchItem reaction,
    List<String> actionParams,
    List<String> reactionParams,
    String trigger,
  ) async {
    var sharedPreferences = await SharedPreferences.getInstance();
    var server_ip = sharedPreferences.getString("server_ip") ?? "";
    String triggerParams = actionParams.removeLast();

    var response = await http.post(
      Uri.parse(server_ip + "/setServices"),
      headers: <String, String>{
        "jwt": (sharedPreferences.getString("token") ?? ""),
      },
      body: <String, String>{
        "action": action.name,
        "actionParams": actionParams.join(","),
        "reaction": reaction.name,
        "reactionParams": reactionParams.join(","),
        "trigger": trigger,
        "triggerParams": triggerParams,
      },
    );

    if (response.statusCode == 201) {
      return true;
    } else {
      return false;
    }
  }

  Future<List<HomeItem>> getActiveAREA() async {
    var sharedPreferences = await SharedPreferences.getInstance();
    var server_ip = sharedPreferences.getString("server_ip") ?? "";

    var response = await http.get(
      Uri.parse(server_ip + "/getServicesByMail"),
      headers: <String, String>{
        "jwt": (sharedPreferences.getString("token") ?? ""),
      },
    );

    if (response.statusCode == 200) {
      dynamic body = json.decode(response.body);
      List<HomeItem> list = List.generate(body.length, (int index) {
        return HomeItem(
            body[index]["action"],
            body[index]["actionparams"],
            body[index]["reaction"],
            body[index]["reactionparams"],
            body[index]["trigger"],
            body[index]["triggerparams"],
            body[index]["id"]);
      });
      return list;
    } else {
      return List.empty();
    }
  }

  Future<bool> deleteAREA(int idAREA) async {
    var sharedPreferences = await SharedPreferences.getInstance();
    var server_ip = sharedPreferences.getString("server_ip") ?? "";

    var response = await http.delete(
      Uri.parse(server_ip + "/deleteService"),
      headers: <String, String>{
        "jwt": (sharedPreferences.getString("token") ?? ""),
      },
      body: <String, String>{
        "id": idAREA.toString(),
      },
    );

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }
}
