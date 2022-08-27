import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:smsw/server.dart';
import 'package:smsw/color.dart';
import 'login.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({Key? key}) : super(key: key);

  @override
  _SignUpPageState createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final _formKey = new GlobalKey<FormState>();

  late String _id;
  late String _name;
  late String _pass;

  void validateAndSignUp() {
    final form = _formKey.currentState;
    if (form!.validate()) {
      form.save();
      print('Form is valid: $_id, name: $_name, password: $_pass');

      signUp(_id, _name, _pass);
    } else {
      print('Form is invalid: $_id, name: $_name, password: $_pass');
    }
  }

  void signUp(String id, name, pass) async {
    var url = Uri.http('${serverHttp}:8080', '/member/signup');

    final data = jsonEncode({'memberId': id, 'name': name, 'password': pass});

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

      if (body["success"] == true) {
        _showDialog("회원가입 성공", "회원가입에 성공했습니다.");
      } else {
        _showDialog("회원가입 실패", "회원가입에 실패했습니다");
      }
    } else if (response.statusCode == 400) {
      print('Response status: ${response.statusCode}');
      print('Response body: ${jsonDecode(utf8.decode(response.bodyBytes))}');

      var body = jsonDecode(response.body);
      dynamic data = body["error"];

      if (body["success"] == false && data["errorName"] == "DUPLICATED") {
        _showDialog("회원가입 실패", "이미 회원가입한 아이디입니다.");
      } else {
        _showDialog("회원가입 실패", "아이디는 빈값일 수 없습니다.");
      }
    } else {
      print('error : ${response.reasonPhrase}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onTap: () {
          //FocusManager.instance.primaryFocus?.unfocus();
          FocusScope.of(context).unfocus();
        },
        child: Scaffold(
            body: SafeArea(
          child: Container(
              padding: EdgeInsets.all(30),
              child: new Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      margin: EdgeInsets.only(bottom: 20.0),
                      alignment: Alignment.center,
                      child: Center(
                        child: Text(
                          '회원가입',
                          style: new TextStyle(
                              fontSize: 28.0,
                              fontWeight: FontWeight.bold,
                              color: Color(greenColor)),
                        ),
                      ),
                    ),
                    Container(
                      child: Column(
                        children: [
                          TextFormField(
                            decoration: new InputDecoration(labelText: '아이디'),
                            validator: (value) =>
                                value!.isEmpty ? '아이디를 입력해주세요' : null,
                            onSaved: (value) => _id = value!,
                          ),
                          Padding(padding: EdgeInsets.all(5.0)),
                          TextFormField(
                            decoration: new InputDecoration(labelText: '이름'),
                            validator: (value) =>
                                value!.isEmpty ? '이름을 입력해주세요' : null,
                            onSaved: (value) => _name = value!,
                          ),
                          Padding(padding: EdgeInsets.all(5.0)),
                          TextFormField(
                            obscureText: true,
                            decoration: new InputDecoration(labelText: '비밀번호'),
                            validator: (value) =>
                                value!.isEmpty ? '비밀번호를 입력해주세요' : null,
                            onSaved: (value) => _pass = value!,
                          ),
                          // TextFormField(
                          //   obscureText: true,
                          //   decoration: new InputDecoration(labelText: '비밀번호 확인'),
                          //   validator: (value) =>
                          //   value!.isEmpty ? '비밀번호가 확인되지 않았습니다' :
                          //   value != _pass? "비밀번호가 일치하지 않습니다." :null,
                          // ),

                        ],
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(top: 40.0, bottom: 10.0),
                      child: new ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          primary: Color(greenColor),
                        ),
                        child: new Text(
                          '회원가입',
                          style: new TextStyle(
                            fontSize: 18.0,
                            color: Color(0xffFFFFFF),
                          ),
                        ),
                        onPressed: () {
                          validateAndSignUp();
                          print("pass" + _pass);
                        },
                      ),
                      height: 45,
                    ),
                    Container(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text('이미 계정이 있으신가요?'),
                          TextButton(
                            onPressed: () {
                              Navigator.pop(context);
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => LoginPage()),
                              );
                            },
                            child: Text(
                              '로그인',
                              style: TextStyle(
                                  color: Color(greenColor),
                                  fontWeight: FontWeight.w600,
                                  decoration: TextDecoration.underline),
                            ),
                          )
                        ],
                      ),
                    )
                  ],
                ),
              )),
        )));
  }

  void _showDialog(String title, text) {
    showDialog<String>(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: Text(
          title,
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        content: Text(text),
        actions: <Widget>[
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              Navigator.push(context,
                MaterialPageRoute(builder: (context) => LoginPage()),
              );
            },
            child: const Text('확인'),
          ),
        ],
      ),
    );
  }
}
