import 'package:area/Requests/Search.dart';
import 'package:area/Views/ConfigActionView.dart';
import 'package:flutter/material.dart';
import 'package:easy_debounce/easy_debounce.dart';

class SearchView extends StatefulWidget {
  SearchView({Key? key}) : super(key: key);

  @override
  _SearchView createState() => _SearchView();
}

class _SearchView extends State<SearchView> {
  List<SearchItem>? items = null;
  final searchBarController = TextEditingController();

  @override
  void initState() {
    super.initState();
    updateSearchItems();
  }

  void dispose() {
    super.dispose();
  }

  void updateSearchItems({String search = ""}) {
    Search().getActionsList(search).then((value) => {
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
        updateSearchItems(search: search),
      },
    );
  }

  Widget ItemSearchView(index) {
    return Container(
      padding: EdgeInsets.all(
        10,
      ),
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => ConfigActionView(items![index]),
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
                hintText: "Search for actions",
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
                  return ItemSearchView(index);
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
