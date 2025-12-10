package com.example.demokot.service

import com.example.demokot.model.Product
import com.example.demokot.repository.ProductRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class ProductService(private val productRepository: ProductRepository) {

    fun findAll(): Flux<Product> = productRepository.findAll()

    fun findById(id: Long): Mono<Product> = productRepository.findById(id)

    @Transactional
    fun save(product: Product): Mono<Product> = productRepository.save(product)
    
    fun update(id: Long, product: Product): Mono<Product> {
        return productRepository.findById(id)
            .flatMap { existingProduct ->
                productRepository.save(product.copy(id = existingProduct.id))
            }
    }

    @Transactional
    fun deleteById(id: Long): Mono<Void> = productRepository.deleteById(id)
}
