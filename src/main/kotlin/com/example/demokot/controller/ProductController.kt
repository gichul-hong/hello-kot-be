package com.example.demokot.controller

import com.example.demokot.model.Product
import com.example.demokot.service.ProductService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/products")
class ProductController(private val productService: ProductService) {

    @GetMapping
    fun getAllProducts(): Flux<Product> {
        return productService.findAll()
    }

    @GetMapping("/{id}")
    fun getProductById(@PathVariable id: Long): Mono<ResponseEntity<Product>> {
        return productService.findById(id)
            .map { ResponseEntity.ok(it) }
            .defaultIfEmpty(ResponseEntity.notFound().build())
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createProduct(@RequestBody product: Product): Mono<Product> {
        return productService.save(product)
    }

    @PutMapping("/{id}")
    fun updateProduct(@PathVariable id: Long, @RequestBody product: Product): Mono<ResponseEntity<Product>> {
        return productService.update(id, product)
            .map { ResponseEntity.ok(it) }
            .defaultIfEmpty(ResponseEntity.notFound().build())
    }

    @DeleteMapping("/{id}")
    fun deleteProduct(@PathVariable id: Long): Mono<ResponseEntity<Void>> {
        return productService.deleteById(id)
            .map { ResponseEntity.noContent().build<Void>() }
    }
}
