import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class Utils {
  void showToast(String value, Color? backgroundColor, Color? textColor) {
    Fluttertoast.showToast(
      msg: value,
      backgroundColor: backgroundColor,
      textColor: textColor,
      gravity: ToastGravity.BOTTOM,
      timeInSecForIosWeb: 1,
      fontSize: 16.0,
    );
  }
}
