import 'package:area/Requests/Search.dart';
import 'package:area/Views/SearchReactionView.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../Utils.dart';

class ConfigActionView extends StatefulWidget {
  final SearchItem actionConfig;
  ConfigActionView(this.actionConfig);
  @override
  _ConfigActionView createState() => _ConfigActionView();
}

class _ConfigActionView extends State<ConfigActionView>
    with TickerProviderStateMixin {
  final ScrollController _scrollController = ScrollController();
  String dropdownValue = '==';
  List<String> savedValues = List.empty();

  _ConfigActionView() {}

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
    _scrollController.dispose();
  }

  void confirmSettings() {
    for (int i = 0; i < savedValues.length; i++) {
      if (savedValues[i].toString() == "" || savedValues[i].toString() == " ") {
        Utils().showToast("One value is missing", Colors.red, Colors.white);
        return;
      }
    }
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) =>
            SearchReactionView(savedValues, widget.actionConfig, dropdownValue),
      ),
    );
  }

  void updateSavedValues(String value, int index) {
    setState(() {
      savedValues[index] = value;
    });
  }

  List<Widget> createFields(SearchItem actionConfig) {
    bool hasInt = false;
    List<Widget> fields = List.generate(actionConfig.req.length, (index) {
      if (actionConfig.req[index].values.toList()[0] == "int") {
        hasInt = true;
      }
      return SizedBox(
        width: MediaQuery.of(context).size.width * 0.75,
        height: MediaQuery.of(context).size.height * 0.1,
        child: TextField(
          inputFormatters: <TextInputFormatter>[
            (actionConfig.req[index].values.toList()[0] == "int"
                ? FilteringTextInputFormatter.allow(
                    RegExp(
                      r'^[0-9]*$',
                    ),
                  )
                : FilteringTextInputFormatter.allow(
                    RegExp(
                      r"^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$",
                    ),
                  )),
          ],
          onChanged: (value) {
            updateSavedValues(value, index);
          },
          decoration: InputDecoration(
            hintText: actionConfig.req[index].keys.toList()[0],
          ),
        ),
      );
    });
    if (hasInt) {
      fields.add(SizedBox(
        width: MediaQuery.of(context).size.width * 0.25,
        height: MediaQuery.of(context).size.height * 0.1,
        child: Center(
          child: DropdownButton<String>(
            value: dropdownValue,
            underline: Container(
              height: 2,
              color: Colors.deepPurpleAccent,
            ),
            onChanged: (String? newValue) {
              setState(() {
                dropdownValue = newValue!;
              });
            },
            items: <String>['==', '!=', '>', '<', '>=', '<=']
                .map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
          ),
        ),
      ));
    }
    fields.insert(
        0, SizedBox(height: MediaQuery.of(context).size.height * 0.05));
    fields.insert(
        1,
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.09,
          child: Center(
            child: TextButton(
              child: Text("Apply Settings"),
              onPressed: () {
                confirmSettings();
              },
              style: TextButton.styleFrom(
                  backgroundColor: Colors.blue, primary: Colors.white),
            ),
          ),
        ));
    fields.insert(
        2, SizedBox(height: MediaQuery.of(context).size.height * 0.05));
    return fields;
  }

  @override
  Widget build(BuildContext context) {
    if (savedValues.isEmpty) {
      savedValues = List.generate(widget.actionConfig.req.length, (i) => "");
    }
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          widget.actionConfig.name,
        ),
      ),
      resizeToAvoidBottomInset: false,
      body: Center(
        child: Column(
          children: createFields(widget.actionConfig),
        ),
      ),
    );
  }
}
