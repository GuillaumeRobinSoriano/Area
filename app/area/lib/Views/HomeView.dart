import 'package:flutter/material.dart';
import '../Requests/Services.dart';
import '../Utils.dart';

class HomeView extends StatefulWidget {
  HomeView({Key? key}) : super(key: key);

  @override
  _HomeView createState() => _HomeView();
}

class _HomeView extends State<HomeView> with TickerProviderStateMixin {
  final ScrollController _scrollController = ScrollController();
  List<HomeItem> _homeItems = List.empty();

  _HomeView() {}

  @override
  void initState() {
    super.initState();
    updateHomeItems();
  }

  @override
  void dispose() {
    super.dispose();
    _scrollController.dispose();
  }

  void updateHomeItems() {
    Services().getActiveAREA().then((value) => {
          setState(() {
            _homeItems = value;
          })
        });
  }

  Widget ItemHomeView(index) {
    return Container(
      padding: EdgeInsets.all(
        10,
      ),
      child: InkWell(
        onTap: () {},
        child: Container(
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
          child: Column(
            children: [
              Row(
                children: [
                  Flexible(
                    child: Center(
                      child: Text(
                        _homeItems[index].actionName,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: MediaQuery.of(context).size.height * 0.05,
                    child: IconButton(
                      iconSize: 20,
                      icon: Icon(Icons.delete),
                      onPressed: () {
                        Services().deleteAREA(_homeItems[index].idAREA).then(
                          (value) {
                            if (value) {
                              Utils().showToast(
                                  "Success", Colors.green, Colors.black);
                              updateHomeItems();
                            } else {
                              Utils().showToast(
                                  "Failure", Colors.red, Colors.black);
                            }
                          },
                        );
                      },
                    ),
                  ),
                ],
              ),
              Flexible(
                child: Container(
                  color: Colors.red,
                  child: Center(
                    child: Text(
                        "We send a message on " +
                        _homeItems[index].reactionName +
                        " at " +
                        _homeItems[index].reactionParams +
                        " when the parameter " +
                        _homeItems[index].actionParams +
                        " is " +
                        _homeItems[index].trigger +
                        " to " +
                        _homeItems[index].triggerParam),
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
      body: _homeItems.isNotEmpty
          ? GridView.count(
              crossAxisCount: 2,
              children: List.generate(
                _homeItems.length,
                (index) {
                  return ItemHomeView(index);
                },
              ),
            )
          : Center(
              child: Text(
                "No active AREA",
              ),
            ),
    );
  }
}
