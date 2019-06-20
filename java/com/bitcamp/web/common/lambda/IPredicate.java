package com.bitcamp.web.common.lambda;

@FunctionalInterface
public interface IPredicate {
    public abstract boolean test(Object o);
    
}