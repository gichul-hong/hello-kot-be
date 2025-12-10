package com.example.demokot.service

import com.example.demokot.model.User
import com.example.demokot.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class UserService(private val userRepository: UserRepository) {

    fun findAll(): Flux<User> = userRepository.findAll()

    fun findById(id: Long): Mono<User> = userRepository.findById(id)

    @Transactional
    fun save(user: User): Mono<User> = userRepository.save(user)

    fun update(id: Long, user: User): Mono<User> {
        return userRepository.findById(id)
            .flatMap { existingUser ->
                userRepository.save(user.copy(id = existingUser.id))
            }
    }

    @Transactional
    fun deleteById(id: Long): Mono<Void> = userRepository.deleteById(id)
}
