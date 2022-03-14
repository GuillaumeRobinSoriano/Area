import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:area/Requests/Profil.dart';

class ConfigProfileView extends StatefulWidget {
  ConfigProfileView({Key? key}) : super(key: key);

  @override
  _ConfigProfileView createState() => _ConfigProfileView();
}

class _ConfigProfileView extends State<ConfigProfileView>
    with TickerProviderStateMixin {
  String _name = "Name :";
  String _banner = "Banner :";
  String _picture = "Picture :";
  String _description = "Description :";

  @override
  void initState() {
    super.initState();
    SharedPreferences.getInstance().then((SharedPreferences prefs) {
      setState(() {});
    });
  }

  Widget buildSettings() {
    TextStyle _nameStyle = TextStyle(
      color: Colors.black,
      fontSize: 28.0,
    );
    return (Text("Settings", style: _nameStyle));
  }

  Widget buildNameField() {
    return TextField(
        decoration: InputDecoration(
          border: OutlineInputBorder(),
          labelText: 'Name...',
        ),
        onSubmitted: (value) => {
              setState(() {
                _name = value;
                Profile().patchUserName(_name);
              }),
            });
  }

  Widget buildBannerField() {
    return TextField(
        decoration: InputDecoration(
          border: OutlineInputBorder(),
          labelText: 'Banner...',
        ),
        onSubmitted: (value) => {
              setState(() {
                _banner = value;
                Profile().patchUserBanner(_banner);
              }),
            });
  }

  Widget buildPictureField() {
    return TextField(
        decoration: InputDecoration(
          border: OutlineInputBorder(),
          labelText: 'Picture...',
        ),
        onSubmitted: (value) => {
              setState(() {
                _picture = value;
                Profile().patchUserPicture(_picture);
              }),
            });
  }

  Widget buildDescriptionField() {
    return TextField(
        decoration: InputDecoration(
          border: OutlineInputBorder(),
          labelText: 'Description...',
        ),
        onSubmitted: (value) => {
              setState(() {
                _description = value;
                Profile().patchUserDescription(_description);
              }),
            });
  }

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.of(context).size;
    return Scaffold(
      body: Stack(
        children: <Widget>[
          SafeArea(
            child: SingleChildScrollView(
              child: Column(
                children: <Widget>[
                  SizedBox(height: screenSize.height / 10.0),
                  buildSettings(),
                  SizedBox(height: screenSize.height / 10.0),
                  buildNameField(),
                  SizedBox(height: screenSize.height / 20.0),
                  buildBannerField(),
                  SizedBox(height: screenSize.height / 20.0),
                  buildPictureField(),
                  SizedBox(height: screenSize.height / 20.0),
                  buildDescriptionField(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
