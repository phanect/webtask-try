"use strict";

// Create IFTTT applet: If new tweet from search for [SEARCH-TERM], then make a web request:
// https://wt-blahblah-0.run.webtask.io/webtask-try?tweet={{LinkToTweet}}

const sendgrid = require("sendgrid");

module.exports = (ctx, done) => {
  const sg = sendgrid(ctx.data.sgApiKey)

  const request = sg.emptyRequest({
    method: "POST",
    path: "/v3/mail/send",
    body: {
      personalizations: [
        {
          to: [
            {
              email: ctx.data.email,
            },
          ],
          subject: "New Tweet!",
        },
      ],
      from: {
        email: "anonymous@example.com",
      },
      content: [
        {
          type: "text/plain",
          value: ctx.data.tweet,
        },
      ],
    },
  });

  sg.API(request).then(() => {
      done(null, "Email Successfully Sent");
    }).catch(function (error) {
      done(null, error.response.statusCode + ": Failed to send email");
    });
}
