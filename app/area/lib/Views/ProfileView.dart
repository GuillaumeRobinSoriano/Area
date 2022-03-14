import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:area/Requests/Profil.dart';

// _name = prefs.getString("name") ?? "Julest Mingue";
// _banner = prefs.getString("banner") ?? "https://e7.pngegg.com/pngimages/998/652/png-clipart-color-geometry-triangle-pattern-angle-computer-wallpaper.png";
// _picture = prefs.getString("picture") ?? "https://cdn.discordapp.com/avatars/767106519321673748/311653bb1e294d1612c81a68666c84a0.webp";
// _description = prefs.getString("description") ?? "Je n'ai pas choisi d'être aussi con";

class ProfileView extends StatefulWidget {
  ProfileView({Key? key}) : super(key: key);

  @override
  _ProfileView createState() => _ProfileView();
}

class _ProfileView extends State<ProfileView> with TickerProviderStateMixin {
  String _name = "";
  String _banner = "";
  String _picture = "";
  String _description = "";

  void load() {
    Profile().getUserInfo().then((value) => {
          if (value != null)
            setState(() {
              print(value);
              _name = value["name"] ?? "No name";
              _banner = value["banner"] ??
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9WZPRiEyWxewKL7p029n13v03ZOLluBBnew&usqp=CAU";
              _picture = value["picture"] ??
                  "https://lesexpertsdurecouvrement.com/wp-content/uploads/2015/11/default-avatar.jpg";
              _description = value["description"] ?? "Default description";
            })
        });
  }

  @override
  void initState() {
    super.initState();
    SharedPreferences.getInstance().then((SharedPreferences prefs) {});
    load();
  }

  Widget buildBanner(Size screenSize) {
    return Container(
      height: screenSize.height / 3.4,
      decoration: BoxDecoration(
          image: DecorationImage(
        image: NetworkImage(_banner),
        fit: BoxFit.cover,
      )),
    );
  }

  Widget buildPicture() {
    return Center(
      child: Container(
        width: 140.0,
        height: 140.0,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: NetworkImage(_picture),
            fit: BoxFit.cover,
          ),
          borderRadius: BorderRadius.circular(80.0),
          border: Border.all(
            color: Colors.white,
            width: 2.0,
          ),
        ),
      ),
    );
  }

  Widget buildName() {
    TextStyle _nameStyle = TextStyle(
      fontFamily: 'Roboto',
      color: Colors.black,
      fontSize: 28.0,
      fontWeight: FontWeight.bold,
    );
    return (Text(_name, style: _nameStyle));
  }

  Widget buildDecription(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 4.0, horizontal: 6.0),
      decoration: BoxDecoration(
        color: Theme.of(context).scaffoldBackgroundColor,
        borderRadius: BorderRadius.circular(4.0),
      ),
      child: Text(
        _description,
        textAlign: TextAlign.center,
        style: TextStyle(
            fontFamily: 'Spectral',
            color: Colors.black,
            fontSize: 20.0,
            fontWeight: FontWeight.w300),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.of(context).size;
    return Scaffold(
      body: Stack(
        children: <Widget>[
          buildBanner(screenSize),
          SafeArea(
            child: SingleChildScrollView(
              child: Column(
                children: <Widget>[
                  SizedBox(height: screenSize.height / 5.0),
                  buildPicture(),
                  buildName(),
                  buildDecription(context),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
