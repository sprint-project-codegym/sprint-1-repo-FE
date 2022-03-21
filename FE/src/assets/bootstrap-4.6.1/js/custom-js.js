// Username không được trống, tối thiểu 4 ký tự,tối đa 30 ký tự, không chứa ký tự đặc biệt(trừ . và @) và khoảng trắng
// Mật khẩu không được trống, tối thiểu 3 ký tự,tối đa 15 ký tự

$(document).ready(function () {
    $('#username').on('focusout', function () {
        if ($('#username').val() != "") {
            if (validateUserName($('#username').val())) {
                $('.error1').fadeOut('slow');
            } else {
                $('.error1').text('Tên tài khoản không đúng định dạng!');
                $('.error1').fadeIn('slow');
            }
        } else {
            $('.error1').text('Tên tài khoản không được để trống!');
            $('.error1').fadeIn("slow");
        }
    });
});
$(document).ready(function () {
    $('#password').on('focusout', function () {
        if ($('#password').val() != "") {
            if (validatePassword($('#password').val())) {
                $('.error2').fadeOut('slow');
            } else {
                $('.error2').text('Mật khẩu không đúng định dạng!');
                $('.error2').fadeIn('slow');
            }
        } else {
            $('.error2').text('Mật khẩu không được để trống!');
            $('.error2').fadeIn("slow");
        }
    });
});


function validateUserName(eVal) {
    var val = /^\S[a-zA-Z0-9@.]{3,29}$/;
    if (val.test(eVal)) {
        return true;
    } else {
        return false;
    }
}

function validatePassword(eVal) {
    var val = /^[-@.\/#&+\w\s]{3,15}$/;
    if (val.test(eVal)) {
        return true;
    } else {
        return false;
    }
}



