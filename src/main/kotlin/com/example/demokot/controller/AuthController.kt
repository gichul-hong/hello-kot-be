package com.example.demokot.controller

import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
class AuthController {

    @GetMapping("/api/user")
    fun getUser(@AuthenticationPrincipal oauth2User: OAuth2User?): Mono<Map<String, Any?>> {
        return if (oauth2User != null) {
            Mono.just(oauth2User.attributes)
        } else {
            Mono.empty()
        }
    }
}
