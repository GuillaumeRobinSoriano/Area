import 'package:area/Views/ServerIpView.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void initSharedPreferences() {
  SharedPreferences.getInstance().then((SharedPreferences prefs) {
    prefs.setBool("isLogged", false);
    prefs.setString("username", "");
    prefs.setString("token", "");
  });
}

void main() {
  runApp(Redditech());
  initSharedPreferences();
}

class Redditech extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'AREA',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: ServerIpView(),
    );
  }
}
