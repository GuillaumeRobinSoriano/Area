import 'package:area/Requests/Login.dart';
import 'package:area/Utils.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../Menu.dart';

class RegisterView extends StatefulWidget {
  RegisterView({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _RegisterView();
}

class _RegisterView extends State<RegisterView> {
  bool _isLogged = false;
  final nameInputController = TextEditingController();
  final emailInputController = TextEditingController();
  final passwordInputController = TextEditingController();
  bool showPassword = false;

  @override
  void initState() {
    super.initState();
    _loadPrefs();
  }

  void _loadPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _isLogged = prefs.getBool("isLogged") ?? false;
    });
  }

  void register() async {
    bool areFieldsCorrect = false;

    if (nameInputController.text.length != 0) {
      if (emailInputController.text.length != 0) {
        if (passwordInputController.text.length != 0) {
          areFieldsCorrect = true;
        } else {
          Utils().showToast(
              "You must provide your password", Colors.red, Colors.white);
        }
      } else {
        Utils()
            .showToast("You must provide your email", Colors.red, Colors.white);
      }
    } else {
      Utils().showToast("You must provide a name", Colors.red, Colors.white);
    }
    if (areFieldsCorrect == true) {
      bool res = await Login().register(
        emailInputController.text,
        passwordInputController.text,
        nameInputController.text,
      );
      SharedPreferences.getInstance().then((SharedPreferences prefs) {
        prefs.setBool("isLogged", res);
      });
      Navigator.of(context).pop(
        MaterialPageRoute(
          builder: (context) => RegisterView(),
        ),
      );
    }
  }

  void resetServerIpAdress() {
    SharedPreferences.getInstance().then((SharedPreferences prefs) {
      prefs.setString("server_ip", "");
    });
  }

  @override
  Widget build(BuildContext context) {
    _loadPrefs();
    if (_isLogged == true) {
      return MenuView();
    } else {
      return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text(
            "Create new account",
          ),
        ),
        resizeToAvoidBottomInset: false,
        body: Column(
          children: [
            SizedBox(height: MediaQuery.of(context).size.height * 0.15),
            SizedBox(
              width: MediaQuery.of(context).size.width * 0.75,
              height: MediaQuery.of(context).size.height * 0.1,
              child: TextField(
                controller: nameInputController,
                decoration: InputDecoration(
                  hintText: "Name",
                  prefixIcon: Icon(Icons.person),
                  suffixIcon: IconButton(
                    icon: Icon(Icons.clear),
                    onPressed: () {
                      nameInputController.clear();
                    },
                  ),
                ),
              ),
            ),
            SizedBox(
              width: MediaQuery.of(context).size.width * 0.75,
              height: MediaQuery.of(context).size.height * 0.1,
              child: TextField(
                controller: emailInputController,
                decoration: InputDecoration(
                  hintText: "Email",
                  prefixIcon: Icon(Icons.mail),
                  suffixIcon: IconButton(
                    icon: Icon(Icons.clear),
                    onPressed: () {
                      emailInputController.clear();
                    },
                  ),
                ),
              ),
            ),
            SizedBox(
              width: MediaQuery.of(context).size.width * 0.75,
              height: MediaQuery.of(context).size.height * 0.1,
              child: TextField(
                controller: passwordInputController,
                obscureText: !showPassword,
                decoration: InputDecoration(
                  hintText: "Password",
                  prefixIcon: Icon(Icons.lock),
                  constraints: BoxConstraints.loose(Size(100, 100)),
                  suffixIcon: IconButton(
                    icon: !showPassword
                        ? Icon(Icons.visibility)
                        : Icon(Icons.visibility_off),
                    onPressed: () {
                      setState(() {
                        showPassword = !showPassword;
                      });
                    },
                  ),
                ),
              ),
            ),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.09,
              child: Center(
                child: TextButton(
                  child: Text("Register"),
                  onPressed: () {
                    register();
                  },
                  style: TextButton.styleFrom(
                      backgroundColor: Colors.blue, primary: Colors.white),
                ),
              ),
            ),
          ],
        ),
      );
    }
  }
}
