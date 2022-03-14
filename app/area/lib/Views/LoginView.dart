import 'package:area/Requests/Login.dart';
import 'package:area/Utils.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../Menu.dart';
import 'RegisterView.dart';

class LoginView extends StatefulWidget {
  LoginView({Key? key}) : super(key: key);
  _LoginView createLogin() => _LoginView();

  @override
  State<StatefulWidget> createState() => _LoginView();
}

class _LoginView extends State<LoginView> {
  bool _isLogged = false;
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

  void login() async {
    bool areFieldsCorrect = false;

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
    if (areFieldsCorrect == true) {
      bool res = await Login()
          .login(emailInputController.text, passwordInputController.text);
      SharedPreferences.getInstance().then((SharedPreferences prefs) {
        prefs.setBool("isLogged", res);
      });
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
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          title: Text("DEBUG"),
          actions: [
            TextButton(
              onPressed: resetServerIpAdress,
              child: Text("Change ip"),
              style: TextButton.styleFrom(primary: Colors.white),
            )
          ],
        ),
        body: Column(
          children: [
            SizedBox(height: MediaQuery.of(context).size.height * 0.24),
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
              height: MediaQuery.of(context).size.height * 0.1,
              child: Center(
                child: TextButton(
                  child: Text("Login"),
                  onPressed: () {
                    login();
                    LoginView();
                  },
                  style: TextButton.styleFrom(
                      backgroundColor: Colors.blue, primary: Colors.white),
                ),
              ),
            ),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.04,
              child: Text(
                "or",
              ),
            ),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.2,
              child: RichText(
                text: TextSpan(
                  text: 'Create an account',
                  style: TextStyle(
                    color: Colors.blue,
                    fontWeight: FontWeight.bold,
                  ),
                  recognizer: TapGestureRecognizer()
                    ..onTap = () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => RegisterView(),
                        ),
                      );
                    },
                ),
              ),
            )
          ],
        ),
      );
    }
  }
}
