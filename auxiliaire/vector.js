"use strict";

/*
This lib was made to provide elementary vector manipulation with optimized maner.


Content

Vec class {
add
sub
:
License : GNU GPL ( LOL )

}

*/

class V {
	/*
		Main vector class
	*/

	constructor ( x = 0, y = 0 ) {
		this.x = x;
		this.y = y;
	}

	static unit( alpha ) {
	    return new V( Math.cos( alpha ), Math.sin( alpha ) );
	}

	static runit( alpha_min = 0, alpha_max = Math.PI * 2) {
		return new V.unit( Math.random() * ( alpha_max - alpha_min ) + alpha_min ); 
	}

	static rbox( x_min, y_min, x_max, y_max ) {
		return new V( Math.random() * ( x_max - x_min ) + x_min, Math.random() * ( y_max - y_min ) + y_min );
	}

	static rvbox( vec1, vec2 ) {
		return new V( Math.random() * ( vec2.x - vec1.x ) + vec1.x, Math.random() * ( vec2.y - vec1.y ) + vec1.y );	
	}

	// Setter pack

	static set( v, x = 0, y = 0 ) {
		v.x = x;
		v.y = y;
	}

	static vset( v , vec ) {
		v.x = vec.x;
		v.y = vec.y;
	}

	static copy( v ) {
		return new V( v.x, v.y );
	}

	// Adder pack

	static add( v, x, y ) {
		v.x += x;
		v.y += y;
	}

	static vadd( v, vec ) {
		v.x += vec.x;
		v.y += vec.y;
	}

	static added( v, x, y ) {
		return new V( v.x + x, v.y + y );
	}

	static vadded( v, vec ) {
		return new V( v.x + vec.x, v.y + y );
	}

	static dadd( v, x, y, res ) {
		res.x = v.x + x;
		res.y = v.y + y;
	}

	static dvadd( v, vec, res ) {
		res.x = v.x + vec.x;
		res.y = v.y + vec.y;
	}

	// Subbstacter pack

	static sub( v, x, y ) {
		v.x -= x;
		v.y -= y;
	}

	static vsub( v, vec ) {
		v.x -= vec.x;
		v.y -= vec.y;
	}

	static subbed( v, x, y ) {
		return new V( v.x - x, v.y - y );
	}

	static vsubbed( v, vec ) {
		return new V( v.x - vec.x, v.y - vec.y );  
	}

	static dsub( v, x, y, res ) {
		res.x = v.x - x;
		res.y = v.y - y;
	}
	
	static dvsub( v, vec, res ) {
		res.x = v.x - vec.x;
		res.y = v.y - vec.y;
	}

	// Scale pack

	static scale( v, s ) {
		v.x *= s;
		v.y *= s;
	}

	static scale2( v, xs, ys ) {
		v.x *= xs;
		v.y *= ys;
	}

	static vscale( v, vec ) {
		v.x *= vec.x;
		v.y *= vec.y;
	}
	
	static scaled( v, s ) {
		return new V( v.x * s, v.y * s );
	}

	static scaled2( v, xs, ys ) {
		return new V( v.x * xs, v.y * xy );
	}

	static vscaled( v, vec ) {
		return new V( v.x * vec.x, v.y * vec.y ); 
	}
	
	static dscale( v, s, res ) {
		res.x = v.x * s;
		res.y = v.y * s;
	}

	static dscale2( v, xs, ys ) {
		res.x = v.x * xs;
		res.y = v.y * ys;
	}

	static dvscale( v, vec, res ) {
		res.x = v.x * vec.x;
		res.y = v.y * vec.y;
	}

	// Norm pack

	static norm( v ) {
		return Math.sqrt( v.x * v.x + v.y * v.y );
	}

	static mnorm( v ) {
		return Math.abs( v.x ) + Math.abs( v.y );	
	}

	static normalize( v ) {
		V.scale( v, 1 /  V.norme( v ) );
	}

	static normalized( v ) {
		return V.scaled( v, 1 / V.norme( v ) );
	}
	
	static dnormalize( res ) {
		V.dvscale( v, 1 / V.norm( v ), res );
	}

	// Transform Pack

	static angle( v ) {
		return Math.atan2( v.x, v.y );
	}

	static rotate( v, alpha ) {
		let c = Math.cos( alpha ), s = Math.sin( alpha ), x = v.x;
		v.x = v.x * c - v.y * s;
		v.y = x * s + v.y * c;
	}
	
	static vrotate( v, vec ) {
		let x = v.x;
		v.x = v.x * vec.x - v.y * vec.y;
		v.y = x * vec.y + v.y * vec.x;
	}

	static rotated( v, alpha ) {
		let c = Math.cos( alpha ), s = Math.sin( alpha )
		return new V( v.x * c - v.y * s, v.x * s + v.y * c );
	}

	static vrotated( v, vec ) {
		return new V( v.x * vec.x - v.y * vec.y, v.x * vec.y + v.y * vec.x );
	}

	static drotate( v, alpha, res ) {
		let c = Math.cos( alpha ), s = Math.sin( alpha );
		res.x = v.x * c - v.y * s;
		res.y = v.x * s - v.y * c; 
	}
	
	static dvrotate( v, vec, res ) {
		res.x = v.x * vec.x - v.y * vec.y;
		res.y = v.x * vec.y + v.y * vec.x;
	}
	
	// Product pack

	static prod( v, x, y ) {
		return x * v.x + y * v.y;
	}

	static vprod( v, vec ) {
		return v.x * vec.x + v.y * vec.y;
	}

	// Convert pack

	static toString( v ) {
		return `<${v.x},${v.y}>`;
	}

	static toArray( v ) {
		return [v.x, v.y];
	}

}


class Vec {
	/*
		Main vector class
	*/

	constructor ( x = 0, y = 0 ) {
		this.x = x;
		this.y = y;
	}

	static unit( alpha ) {
		return new Vec( Math.cos( alpha ), Math.sin( alpha ) )
	}

	static runit( alpha_min = 0, alpha_max = Math.PI * 2) {
		return new Vec.unit( Math.random() * ( alpha_max - alpha_min ) + alpha_min ); 
	}

	static rbox( x_min, y_min, x_max, y_max ) {
		return new Vec( Math.random() * ( x_max - x_min ) + x_min, Math.random() * ( y_max - y_min ) + y_min );
	}

	static rvbox( vec1, vec2 ) {
		return new Vec( Math.random() * ( vec2.x - vec1.x ) + vec1.x, Math.random() * ( vec2.y - vec1.y ) + vec1.y );	
	}

	// Setter pack

	set( x = 0, y = 0 ) {
		this.x = x;
		this.y = y;
	}

	vset( vec ) {
		this.x = vec.x;
		this.y = vec.y;
	}

	copy() {
		return new Vec( this.x, this.y );
	}

	// Adder pack

	add( x, y ) {
		this.x += x;
		this.y += y;
	}

	vadd( vec ) {
		this.x += vec.x;
		this.y += vec.y;
	}

	added( x, y ) {
		return new Vec( this.x + x, this.y + y );
	}

	vadded( vec ) {
		return new Vec( this.x + vec.x, this.y + y );
	}

	dadd( x, y, res ) {
		res.x = this.x + x;
		res.y = this.y + y;
	}

	dvadd( vec, res ) {
		res.x = this.x + vec.x;
		res.y = this.y + vec.y;
	}

	// Subbstacter pack

	sub( x, y ) {
		this.x -= x;
		this.y -= y;
	}

	vsub( vec ) {
		this.x -= vec.x;
		this.y -= vec.y;
	}

	subbed( x, y ) {
		return new Vec( this.x - x, this.y - y );
	}

	vsubbed( vec ) {
		return new Vec( this.x - vec.x, this.y - vec.y );  
	}

	dsub( x, y, res ) {
		res.x = this.x - x;
		res.y = this.y - y;
	}
	
	dvsub( vec, res ) {
		res.x = this.x - vec.x;
		res.y = this.y - vec.y;
	}

	// Scale pack

	scale( s ) {
		this.x *= s;
		this.y *= s;
	}

	scale2( xs, ys ) {
		this.x *= xs;
		this.y *= ys;
	}

	vscale( vec ) {
		this.x *= vec.x;
		this.y *= vec.y;
	}
	
	scaled( s ) {
		return new Vec( this.x * s, this.y * s );
	}

	scaled2( xs, ys ) {
		return new Vec( this.x * xs, this.y * xy );
	}

	vscaled( vec ) {
		return new Vec( this.x * vec.x, this.y * vec.y ); 
	}
	
	dscale( s, res ) {
		res.x = this.x * s;
		res.y = this.y * s;
	}

	dscale2( xs, ys ) {
		res.x = this.x * xs;
		res.y = this.y * ys;
	}

	dvscale( vec, res ) {
		res.x = this.x * vec.x;
		res.y = this.y * vec.y;
	}

	// Norm pack

	norm() {
		return Math.sqrt( this.x * this.x + this.y * this.y );
	}

	mnorm() {
		return Math.abs( this.x ) + Math.abs( this.y );	
	}

	normalize() {
		this.scale( 1 / this.norme() );
	}

	normalized() {
		return this.scaled( 1 / this.norme() );
	}
	
	dnormalize( res ) {
		this.dvscale( 1 / this.norm(), res );
	}

	// Transform Pack

	angle() {
		return Math.atan2( this.x, this.y );
	}

	rotate( alpha ) {
		let c = Math.cos( alpha ), s = Math.sin( alpha ), x = this.x;
		this.x = this.x * c - this.y * s;
		this.y = x * s + this.y * c;
	}
	
	vrotate( vec ) {
		let x = this.x;
		this.x = this.x * vec.x - this.y * vec.y;
		this.y = x * vec.y + this.y * vec.x;
	}

	rotated( alpha ) {
		let c = Math.cos( alpha ), s = Math.sin( alpha )
		return new Vec( this.x * c - this.y * s, this.x * s + this.y * c );
	}

	vrotated( vec ) {
		return new Vec( this.x * vec.x - this.y * vec.y, this.x * vec.y + this.y * vec.x );
	}

	drotate( alpha, res ) {
		let c = Math.cos( alpha ), s = Math.sin( alpha );
		res.x = this.x * c - this.y * s;
		res.y = this.x * s - this.y * c; 
	}
	
	dvrotate( vec, res ) {
		res.x = this.x * vec.x - this.y * vec.y;
		res.y = this.x * vec.y + this.y * vec.x;
	}
	
	// Product pack

	prod( x, y ) {
		return x * this.x + y * this.y;
	}

	vprod( vec ) {
		return this.x * vec.x + this.y * vec.y;
	}

	// Convert pack

	toString() {
		return `<${this.x},${this.y}>`;
	}

	toArray() {
		return [this.x, this.y];
	}

}
