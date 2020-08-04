module.exports = {
  'POST /signin': async (ctx, next) => {
    var
      email = ctx.request.body.email || '',
      password = ctx.request.body.password || '';
    if (email === 'some@gmail.com' && password === 'password') {
      ctx.render('signin_ok.html', {title: 'OK', email: email});
    } else {
      ctx.render('signin_failed.html', {title: 'Failed'});
    }
  }
};