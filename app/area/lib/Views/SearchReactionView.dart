import 'package:area/Requests/Search.dart';
import 'package:area/Views/ConfigReactionView.dart';
import 'package:flutter/material.dart';
import 'package:easy_debounce/easy_debounce.dart';

class SearchReactionView extends StatefulWidget {
  final List<String> actionParams;
  final SearchItem actionConfig;
  final String trigger;
  SearchReactionView(this.actionParams, this.actionConfig, this.trigger);

  @override
  _SearchReactionView createState() => _SearchReactionView();
}

class _SearchReactionView extends State<SearchReactionView> {
  List<SearchItem>? items = null;
  final searchBarController = TextEditingController();

  @override
  void initState() {
    super.initState();
    updateReactionItems();
  }

  void dispose() {
    super.dispose();
  }

  void updateReactionItems({String search = ""}) {
    Search().getReactionsList(search).then((value) => {
          if (value != List.empty())
            setState(() {
              items = value;
            })
        });
  }

  void _search(String search) {
    EasyDebounce.debounce(
      'search-bar-debouncer',
      Duration(seconds: 2),
      () => {
        updateReactionItems(search: search),
      },
    );
  }

  Widget ItemSearchReactionView(index) {
    return Container(
      padding: EdgeInsets.all(
        10,
      ),
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => ConfigReactionView(widget.actionParams,
                  items![index], widget.actionConfig, widget.trigger),
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
            color: items![index].color,
            border: Border.all(
              color: Colors.black38,
              width: 2,
            ),
            borderRadius: BorderRadius.all(
              Radius.circular(
                5,
              ),
            ),
          ),
          child: Column(
            children: [
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.05,
                child: Container(
                  child: Image.network(items![index].logoPath),
                ),
              ),
              Flexible(
                child: Container(
                  color: Colors.red,
                  child: Center(
                    child: Text(items![index].description),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        toolbarHeight: 50,
        title: Container(
          width: double.infinity,
          height: 40,
          decoration: BoxDecoration(
            border: Border.all(
              color: Colors.black38,
              width: 2,
            ),
            borderRadius: BorderRadius.all(
              Radius.circular(
                5,
              ),
            ),
          ),
          child: Center(
            child: TextField(
              onChanged: _search,
              cursorColor: Colors.black38,
              decoration: InputDecoration(
                border: InputBorder.none,
                hintText: "Search for reaction",
                hintStyle: TextStyle(
                  color: Colors.white,
                ),
                prefixIconConstraints: BoxConstraints.tight(Size(50, 20)),
                prefixIcon: Icon(
                  Icons.search,
                  color: Colors.black,
                ),
              ),
            ),
          ),
        ),
      ),
      body: items != null && items!.length != 0
          ? GridView.count(
              crossAxisCount: 2,
              children: List.generate(
                items!.length,
                (index) {
                  return ItemSearchReactionView(index);
                },
              ),
            )
          : Center(
              child: Text(
                "No results",
              ),
            ),
    );
  }
}
