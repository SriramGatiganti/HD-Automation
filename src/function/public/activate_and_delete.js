let h_username;
let h_password;
let p_username;
let p_password;
let t_code;

switch (process.profile.split(':')[2]) {
  //switch ('acc') {
  case 'acc':
    p_username = 'public-rest-client';
    p_password = 'qepa8EHEfr';
    h_username = 'hydra-rest-client';
    h_password = 'LeAKr9zuN7GY8Q8l';
    break;
  case 'prd':
    h_username = 'hydra-rest-client';
    h_password = '7eBy728NBhQCmjXa';
    p_username = 'public-rest-client';
    p_password = 'pR57UKsAW1t2aIN6';
    break;
  case 'dev':
    p_username = 'public-rest-client';
    p_password = 'X6RTT3Ky3Fmq86cp';
    h_username = 'hydra-rest-client';
    h_password = 'X6RTT3Ky3Fmq86cp';
    break;
  case 'stg':
    //p_username = 'public-rest-client';
    //p_password = 'X6RTT3Ky3Fmq86cp';
    //h_username = 'hydra-rest-client';
    //h_password = 'X6RTT3Ky3Fmq86cp';
    break;
};

var Imap = require('imap'),
  inspect = require('util').inspect;
var imap = new Imap({
  user: 'testing.auto.0123@gmail.com',
  password: 'Test1234!',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});
var EventEmitter = require("events").EventEmitter;
var t_id = new EventEmitter();

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

function get_tid() {
  imap.connect();
  imap.once('ready', function() {
    openInbox(function(err, box) {
      if (err) throw err;
      var f = imap.seq.fetch(box.messages.total + ':*', {
        bodies: ['HEADER.FIELDS (FROM)', 'TEXT']
      });
      f.on('message', function(msg, seqno) {
        //console.log('Message #%d', seqno);
        //var prefix = '(#' + seqno + ') ';
        msg.on('body', function(stream, info) {
          //if (info.which === 'TEXT')
          //console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
          var buffer = '',
            count = 0;
          stream.on('data', function(chunk) {
            count += chunk.length;
            buffer += chunk.toString('utf8');
            //if (info.which === 'TEXT')
            //console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);
          });
          stream.once('end', function() {
            if (info.which == 'TEXT') {
              //register/confirm/538?mac=3Daluwj89psbx5210c9knbaeh7f">Activate account</a>
              var re_1 = new RegExp('/confirm\/(.*)\?/');
              var r_1 = buffer.match(re_1);
              var re_2 = new RegExp('autnew (.*),');
              var r_2 = buffer.match(re_2);
              if (r_1 && r_2) {
                t_id.data = r_1[1].split('"')[0].replace("=3D", "=") + ";" + r_2[1].replace(",", "").replace('autnew ', '');
                t_id.emit('update');
              };
            };
          });
        });
      });
      f.once('error', function(err) {
        console.log('Fetch error: ' + err);
      });
      f.once('end', function() {
        //console.log('Done fetching all messages!');
        imap.end();
      });
    });
  });

  imap.once('error', function(err) {
    console.log(err);
  });

  imap.once('end', function() {
    //console.log('Connection ended');
  });
}

function activate(res_url, timestamp, title) {
  console.log('Check Email activate standalone restaurant.');
  get_tid();
  //Only quit when the timestamp matched
  t_id.on('update', function() {
    console.log('\nGet activation URL and request it.')
    let t_data = t_id.data.split(";");

    if (t_data[1] == timestamp) {
      let activate_url = res_url + "/register/confirm/" + t_data[0];
      var request = require('request');
      request(activate_url, function(error, response, body) {
        if (error) {
          console.log('error:', error);
        } // Print the error if one occurred
        console.log('\nActivate statusCode:', response && response.statusCode); // Print the response status code if a response was received
        t_id.emit('end');
      });
    } else {
      setTimeout(function() {
        get_tid();
      }, 10000);
    }
  });

  t_id.on('end', function() {
    console.log('\nActivation Done');
  });
};

function remove_restaurant(t_code, e_code, res_url) {
  console.log('\nTrigger curl call to remove restaurant');
  var request = require('request');
  var EventEmitter = require("events").EventEmitter;
  var body = new EventEmitter();
  var u;
  var p;

  if (t_code == "hydra") {
    u = h_username;
    p = h_password;
  } else {
    u = p_username;
    p = p_password;
  };

  var options = {
    url: res_url + '/oauth/token',
    formData: {
      'client_id': 'trusted_client',
      'client_secret': 'secret',
      'grant_type': 'password',
      'username': u,
      'password': p
    }
  };

  request.post(
    options,
    function(error, response, data) {
      body.data = data;
      body.emit('get_token');
    }
  );

  body.on('get_token', function() {
    var token = JSON.parse(body.data).access_token;
    //console.log(token);

    var options = {
      url: res_url + '/rest/v1/' + t_code + '/establishment/' + e_code + '/delete',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    /*
    function callback(error, response, body) {
      console.log('result:');
      console.log(response.statusCode)
    }*/
    //request.post(options, callback);
    request.post(
      options,
      function(error, response, data) {
        console.log('\nRemove statusCode:', response && response.statusCode);
        body.emit('end');
      }
    );
  });

  body.on('end', function() {
    console.log('Deletion Done');
  });
};

function check_h_email() {
  imap = new Imap({
    user: 'testreser0@gmail.com',
    password: 'Abc123321!',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
  });
  //console.log(imap);
  imap.connect();
  imap.once('ready', function() {
    openInbox(function(err, box) {
      if (err) throw err;
      var f = imap.search([
        ['X-GM-RAW', 'label:shared_email']
      ], function(err, results) {
        if (err) throw err;
        //console.log(results);
        var num = results.length - 1;
        var f = imap.fetch(results[num] + ':' + results[num], {
          bodies: ['HEADER.FIELDS (TO)']
        });
        f.on('message', function(msg, seqno) {
          var prefix = '(#' + seqno + ') ';
          msg.on('body', function(stream, info) {
            var buffer = '',
              count = 0;
            stream.on('data', function(chunk) {
              count += chunk.length;
              buffer += chunk.toString('utf8');
            });
            stream.once('end', function() {
              t_id.data = buffer.replace('To: ', '').trim().replace('\r\n', '').replace('\n', '');
              require('fs').writeFile("log_to_upload.txt", t_id.data, function(err) {
                if (err) {
                  console.log(err);
                };
                console.log('\nWrite into file');
                console.log(t_id.data);
              })
              //t_id.emit('update');
              //observer.send(t_id, 'update', t_id.data);
            });
          });
        });
        f.once('error', function(err) {
          console.log('Fetch error: ' + err);
        });
        f.once('end', function() {
          imap.end();
        });
      });
    });
  });

  imap.once('error', function(err) {
    console.log(err);
  });

  imap.once('end', function() {
    //console.log('Connection ended');
  });
}

module.exports = {
  activate: function(a, b, c) {
    return new Promise(
      function(resolve, reject) {
        resolve(activate(a, b, c));
      }
    );
  },
  remove: function(a, b, c) {
    remove_restaurant(a, b, c);
    return 0;
  },
  check_shared_email: function(a) {
    check_h_email();
  }
};
