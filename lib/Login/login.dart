import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../tabbar_mainview.dart';
import '../Login/findPassword.dart';
import 'signup.dart';
import 'package:smsw/server.dart';
import 'package:smsw/color.dart';

var authToken = '';
var refreshToken = '';
var name = "";
var id = "";

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = new GlobalKey<FormState>();

  late String _id;
  late String _password;

  void validateAndSave() {
    final form = _formKey.currentState;
    if (form!.validate()) {
      form.save();
      print('Form is valid Email: $_id, password: $_password');

      signIn(_id, _password);
    } else {
      print('Form is invalid Email: $_id, password: $_password');
    }
  }

  void forgotPassword() {
    Navigator.pop(context);
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => findPasswordPage()),
    );
  }

  void signUp() {
    Navigator.pop(context);
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SignUpPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    // final authToken = Provider.of<AccessToken>(context);

    return GestureDetector(
        onTap: () {
          //FocusManager.instance.primaryFocus?.unfocus();
          FocusScope.of(context).unfocus();
        },
        child: Scaffold(
            body: new Container(
              child: Container(
                padding: EdgeInsets.all(30),
                child: new Form(
                  key: _formKey,
                  child: new Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        margin: EdgeInsets.only(
                            left: 0.0, top: 0.0, right: 0.0, bottom: 20.0),
                        alignment: Alignment.center,
                        child: new Text(
                          "로그인",
                          style: new TextStyle(
                              fontSize: 28.0,
                              fontWeight: FontWeight.bold,
                              color: Color(greenColor)),
                        ),
                      ),

                      Container(
                        child: new Column(
                          children: <Widget>[
                            new TextFormField(
                              decoration: new InputDecoration(labelText: '아이디'),
                              validator: (value) =>
                              value!.isEmpty ? '아이디를 입력해주세요' : null,
                              onSaved: (value) => _id = value!,
                            ),
                            Padding(padding: EdgeInsets.all(5.0)),
                            new TextFormField(
                              obscureText: true,
                              decoration:
                              new InputDecoration(labelText: '비밀번호'),
                              validator: (value) => value!.isEmpty
                                  ? '비밀번호를 입력해주세요'
                                  : null,
                              onSaved: (value) => _password = value!,
                            ),
                          ],
                        ),
                      ),

                      //로그인
                      Container(
                        margin: EdgeInsets.only(left: 0.0, top: 40.0, right: 0.0, bottom: 10.0),
                        child: new ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10.0)
                            ),
                            primary: Color(greenColor),
                          ),
                          child: new Text(
                            '로그인',
                            style: new TextStyle(
                              fontSize: 18.0,
                              color: Color(0xffFFFFFF),
                            ),
                          ),
                          onPressed: validateAndSave,
                        ),
                        height: 45
                      ),
                      //회원가입
                      Container(
                        margin: EdgeInsets.only(
                            left: 0.0, top: 5.0, right: 0.0, bottom: 0.0),
                        child:new Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              margin: EdgeInsets.only(right: 5.0),
                                child: TextButton(
                                    onPressed: signUp,
                                    child: const Text(
                                      "회원가입",
                                      style: TextStyle(
                                        fontSize: 15.0,
                                        color: Color(0xff666666),
                                      ),
                                    ),
                                  )
                                ),
                            Container(
                                child: TextButton(
                                    onPressed: forgotPassword,
                                    child: const Text(
                                      "비밀번호 찾기",
                                      style: TextStyle(
                                        fontSize: 15.0,
                                        color: Color(0xff666666),
                                      ),
                                    ),
                                  )
                                )
                          ],
                        )
                      ),
                    ],
                  ),
                ),
              ),
            )));
  }

  void signIn(String id, pass) async {
    var url = Uri.http('${serverHttp}:8080', '/member/login');

    final data = jsonEncode({'memberId': id, 'password': pass});

    var response = await http.post(url, body: data, headers: {
      'Accept': 'application/json',
      "content-type": "application/json"
    });

    // print(url);
    print(response.statusCode);

    if (response.statusCode == 200) {
      print('Response status: ${response.statusCode}');
      print('Response body: ${jsonDecode(utf8.decode(response.bodyBytes))}');

      var body = jsonDecode(response.body);

      ///!! 일단 result 값으로 지정해 놓음. 후에 서버와 논의하여 data값 설정하기.
      //print("token: " + token.toString());
      dynamic data=body["response"];

      if (body["success"] == true) {
        String token = data["accessToken"];
        refreshToken = data["refreshToken"];
        print("로그인에 성공하셨습니다.");
        authToken = token;

        userInfo();
        Navigator.pop(context);
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => tabBarMainPage()),
        );
      }
    } else if(response.statusCode == 400){
      print('Response status: ${response.statusCode}');
      print('Response body: ${jsonDecode(utf8.decode(response.bodyBytes))}');

      var body = jsonDecode(response.body);
      dynamic data=body["error"];

      if (body["success"] == false && data["errorName"]=="USER_NOT_FOUND") {
        _showDialog("요청한 회원이 존재하지 않습니다.");
      }
      else if (body["success"] == false && data["errorName"]=="WRONG_PASSWORD"){
      _showDialog("비밀번호가 틀렸습니다.");
      }
      else{
      _showDialog("회원의 password는 빈값일 수 없습니다.");
      }
    }
    else {
      print(response.reasonPhrase);
    }
  }

  void userInfo() async {
    var url = Uri.http('${serverHttp}:8080', '/member/info');

    var response = await http.get(url, headers: {
      'Accept': 'application/json',
      "content-type": "application/json",
      "X-AUTH-TOKEN": "Bearer ${authToken}"
    });

    print(url);
    print("Bearer ${authToken}");
    print('Response status: ${response.statusCode}');

    if (response.statusCode == 200) {
      print('Response body: ${jsonDecode(utf8.decode(response.bodyBytes))}');

      var body = jsonDecode(utf8.decode(response.bodyBytes));

      var data = body["data"];
      id = data["memberId"].toString();
      name = data["name"].toString();
    } else {
      print('error : ${response.reasonPhrase}');
    }
  }

  void _showDialog(String text){
    showDialog(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: const Text(
          '로그인 실패',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        content: Text(text),
        actions: <Widget>[
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: const Text('확인'),
          ),
        ],
      ),
    );
  }
}