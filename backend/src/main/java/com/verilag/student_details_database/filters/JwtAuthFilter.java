package com.verilag.student_details_database.filters;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.verilag.student_details_database.services.JwtService;
import com.verilag.student_details_database.services.UserDetailsServiceImp;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthFilter extends OncePerRequestFilter{

    private final JwtService jwtService;
    private final UserDetailsServiceImp studentDetailsService;
    
    public JwtAuthFilter(JwtService jwtService, UserDetailsServiceImp studentDetailsService) {
        this.jwtService = jwtService;
        this.studentDetailsService = studentDetailsService;
    }
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        // TODO Auto-generated method stub
        String authHeader=request.getHeader( "Authorization");

        if(authHeader==null || !authHeader.startsWith(("Bearer "))){
            filterChain.doFilter(request, response);
            return;
        }

        String token=authHeader.substring(7);
        String username=jwtService.extractUsername(token);

        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null){

            UserDetails userDetails=studentDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,null,userDetails.getAuthorities()
            );

            authToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
            );

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        
        throw new UnsupportedOperationException("Unimplemented method 'doFilterInternal'");
    }

}
