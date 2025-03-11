package com.verilag.student_details_database.services;

import java.sql.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.verilag.student_details_database.models.Student;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
 
    private final String SECRET_KEY="5728768c02891ce06b537e91b48bad649369cae0cd5a7c3c663d0f7cb3e871cb";

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isValid(String token,UserDetails student){
        String username=extractUsername(token);
        return (username.equals(student.getUsername()))&& !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new java.util.Date());

    }

    private java.util.Date extractExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
    }

    public <T> T extractClaim(String token,Function<Claims,T> resolver){
        Claims claims=extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts
               .parser()
               .verifyWith(getSigninKey())
               .build()
               .parseSignedClaims(token)
               .getPayload();
    }

    public String generateToken(Student student){
        String token=Jwts
                    .builder()
                    .subject(student.getUsername())
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis()+24*60*60*1000))
                    .signWith(getSigninKey())
                    .compact();
        
        return token;
    }

    private SecretKey getSigninKey(){
        byte[] keyBytes=Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

