import 'package:flutter/material.dart';
import 'package:area/Views/HomeView.dart';
import 'package:area/Views/SearchView.dart';
import 'package:area/Views/ProfileView.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'Views/ConfigProfileView.dart';
import 'Views/LoginView.dart';

class MenuView extends StatefulWidget {
  MenuView({Key? key}) : super(key: key);

  @override
  _MenuView createState() => _MenuView();
}

class _MenuView extends State<MenuView> {
  int index = 0;
  List<Widget> widgetList = [
    HomeView(),
    SearchView(),
    ProfileView(),
    ConfigProfileView()
  ];

  void _changeIndex(int idx) {
    setState(() {
      index = idx;
    });
  }

  void _logout() {
    SharedPreferences.getInstance().then((SharedPreferences prefs) {
      prefs.setBool("isLogged", false);
      prefs.setString("token", "");
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("AREA"),
        actions: <Widget>[
          Padding(
            padding: EdgeInsets.only(right: 20.0),
            child: GestureDetector(
              onTap: () {
                _logout();
                LoginView();
              },
              child: Icon(Icons.logout),
            ),
          ),
        ],
      ),
      body: Center(
        child: widgetList.elementAt(index),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.home,
            ),
            label: "Home",
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.search,
            ),
            label: "Search",
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.person,
            ),
            label: "Profile",
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.settings,
            ),
            label: "Settings",
          )
        ],
        onTap: _changeIndex,
        currentIndex: index,
        selectedItemColor: Colors.red,
        unselectedItemColor: Colors.black,
      ),
    );
  }
}
