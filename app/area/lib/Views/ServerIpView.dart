import 'dart:io';

import 'package:area/Utils.dart';
import 'package:area/Views/LoginView.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class ServerIpView extends StatefulWidget {
  ServerIpView({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _ServerIpView();
}

class _ServerIpView extends State<ServerIpView> {
  final inputController = TextEditingController();
  String serverIp = "";

  @override
  void initState() {
    super.initState();
    _loadPrefs();
  }

  void _loadPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      serverIp = prefs.getString("server_ip") ?? "";
    });
  }

  void checkIp(String ip) async {
    var res = null;
    try {
      res = await http
          .get(Uri.parse("http://" + ip + ":8080/ping"))
          .timeout(const Duration(seconds: 5));
    } on SocketException {
      Utils().showToast("Wrong IP adress", Colors.red, Colors.white);
      return;
    }
    if (res != null && res.statusCode == 200) {
      SharedPreferences.getInstance().then((SharedPreferences prefs) {
        prefs.setString("server_ip", "http://" + ip + ":8080");
      });
      setState(() {
        serverIp = ip;
      });
      Utils().showToast("Good IP adress", Colors.green, Colors.white);
    }
  }

  @override
  Widget build(BuildContext context) {
    _loadPrefs();
    if (serverIp != "") {
      return LoginView();
    } else {
      return Scaffold(
        resizeToAvoidBottomInset: false,
        body: Container(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              SizedBox(
                width: MediaQuery.of(context).size.width * 1,
                height: MediaQuery.of(context).size.height * 0.5,
                child: Center(
                  child: Image.asset("assets/Area51.jpg"),
                ),
              ),
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.75,
                height: MediaQuery.of(context).size.height * 0.5,
                child: TextField(
                  controller: inputController,
                  decoration: InputDecoration(
                      hintText: 'Enter server IP => ex 192.168.x.x',
                      suffix: IconButton(
                        icon: Icon(Icons.clear),
                        onPressed: () {
                          inputController.clear();
                        },
                      )),
                  keyboardType: TextInputType.phone,
                  onSubmitted: checkIp,
                ),
              )
            ],
          ),
        ),
      );
    }
  }
}
