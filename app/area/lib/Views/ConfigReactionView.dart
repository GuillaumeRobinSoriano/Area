import 'package:flutter/material.dart';
import '../Requests/Search.dart';
import '../Requests/Services.dart';
import '../Utils.dart';

class ConfigReactionView extends StatefulWidget {
  final List<String> actionParams;
  final SearchItem configAction;
  final SearchItem configReaction;
  final String trigger;
  ConfigReactionView(
      this.actionParams, this.configReaction, this.configAction, this.trigger);
  @override
  _ConfigReactionView createState() => _ConfigReactionView();
}

class _ConfigReactionView extends State<ConfigReactionView>
    with TickerProviderStateMixin {
  final ScrollController _scrollController = ScrollController();

  _ConfigReactionView() {}

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
    _scrollController.dispose();
  }

  void confirmSettings(List<TextEditingController> _controllers) {
    List<String> fieldsValues = List.generate(_controllers.length, (index) {
      return _controllers[index].text.toString();
    });
    for (int i = 0; i < fieldsValues.length; i++) {
      if (fieldsValues[i].toString() == "" ||
          fieldsValues[i].toString() == " ") {
        Utils().showToast("One value is missing", Colors.red, Colors.white);
        return;
      }
    }
    Services()
        .setService(widget.configAction, widget.configReaction,
            widget.actionParams, fieldsValues, widget.trigger)
        .then((value) {
      if (value == true) {
        Utils().showToast("Success", Colors.green, Colors.black);
        Navigator.of(context).popUntil(
          (route) => route.isFirst,
        );
      } else {
        Utils().showToast("Failure", Colors.red, Colors.black);
      }
    });
  }

  List<Widget> createFields(
      SearchItem configReaction, List<TextEditingController> _controllers) {
    List<Widget> fields = List.generate(configReaction.req.length, (index) {
      return SizedBox(
        width: MediaQuery.of(context).size.width * 0.75,
        height: MediaQuery.of(context).size.height * 0.1,
        child: TextField(
          controller: _controllers[index],
          decoration: InputDecoration(
            hintText: configReaction.req[index].keys.toList()[0],
            suffixIcon: IconButton(
              icon: Icon(Icons.clear),
              onPressed: () {
                _controllers[index].clear();
              },
            ),
          ),
          keyboardType: TextInputType.emailAddress,
        ),
      );
    });
    fields.insert(
        0, SizedBox(height: MediaQuery.of(context).size.height * 0.15));
    fields.add(SizedBox(
      height: MediaQuery.of(context).size.height * 0.09,
      child: Center(
        child: TextButton(
          child: Text("Apply Settings"),
          onPressed: () {
            confirmSettings(_controllers);
          },
          style: TextButton.styleFrom(
              backgroundColor: Colors.blue, primary: Colors.white),
        ),
      ),
    ));
    return fields;
  }

  @override
  Widget build(BuildContext context) {
    List<TextEditingController> _controllers = List.generate(
      widget.configReaction.req.length,
      (i) => TextEditingController(),
    );
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          widget.configReaction.name,
        ),
      ),
      resizeToAvoidBottomInset: false,
      body: Center(
        child: Column(
          children: createFields(widget.configReaction, _controllers),
        ),
      ),
    );
  }
}
