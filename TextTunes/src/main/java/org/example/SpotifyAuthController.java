package org.example;

import jakarta.servlet.http.HttpServletResponse;
import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;


import java.io.IOException;
import java.net.URI;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class SpotifyAuthController {

    private static final String clientID = "8be7fdaeed0440d48b532a93548268ab";
    private static final String clientsSecret = "6f2f4b3c50984ee2a5b859bfaf21942a";

    private static final URI redirectURI = SpotifyHttpManager.makeUri("http://localhost:8080/api/get-spotify");

    private static String callbackURI;
    String code = "";
    private static final SpotifyApi spotifyAPI = SpotifyApi.builder().setClientId(clientID)
            .setClientSecret(clientsSecret)
            .setRedirectUri(redirectURI)
            .build();

    @GetMapping("login")
    @ResponseBody
    public String spotifyLogin() {
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyAPI.authorizationCodeUri()
                .scope("user-read-private, user-read-email, user-top-read")
                .show_dialog(true)
                .build();

//        callbackURI = callBackURIParam;

        final URI uri  = authorizationCodeUriRequest.getUri();

        return uri.toString();
    }

    @GetMapping("get-spotify")
    public void getSpotifyUserCode(@RequestParam("code") String userCode, HttpServletResponse response) throws IOException {
        code = userCode;
        AuthorizationCodeRequest authorizationCodeRequest = spotifyAPI.authorizationCode(code).build();

        try {
            final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();

            spotifyAPI.setAccessToken(authorizationCodeCredentials.getAccessToken());
            spotifyAPI.setRefreshToken(authorizationCodeCredentials.getRefreshToken());

            System.out.println("Token expires in " + authorizationCodeCredentials.getExpiresIn());
        }   catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e);
        }

    }

    @GetMapping("get-access-token")
    String getAccessToken() {

        return spotifyAPI.getAccessToken();

    }


}
