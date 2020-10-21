declare namespace devil {
    /**
     * 2D矢量
     * luzhihong
     * create 2017-11-09
     */
    class Vector2D {
        private _x;
        private _y;
        /**
         * Constructor.
         */
        constructor(x?: number, y?: number);
        /**
         * Generates a copy of this vector.
         * @return Vector2D A copy of this vector.
         */
        clone(): Vector2D;
        /**
        * Sets this vector's x and y values, and thus length, to zero.
        * @return Vector2D A reference to this vector.
        */
        zero(): Vector2D;
        /**
         * Whether or not this vector is equal to zero, i.e. its x, y, and length are zero.
         * @return boolean True if vector is zero, otherwise false.
         */
        isZero(): boolean;
        /**
         * Sets / gets the length or magnitude of this vector. Changing the length will change the x and y but not the angle of this vector.
         */
        set length(value: number);
        get length(): number;
        /**
         * Gets the length of this vector, squared.
         */
        get lengthSQ(): number;
        /**
         * Gets / sets the angle of this vector. Changing the angle changes the x and y but retains the same length.
         */
        set angle(value: number);
        get angle(): number;
        /**
         * Normalizes this vector. Equivalent to setting the length to one, but more efficient.
         * @return Vector2D A reference to this vector.
         */
        normalize(): Vector2D;
        /**
         * Whether or not this vector is normalized, i.e. its length is equal to one.
         * @return boolean True if length is one, otherwise false.
         */
        isNormalized(): boolean;
        /**
         * Reverses the direction of this vector.
         * @return Vector2D A reference to this vector.
         */
        reverse(): Vector2D;
        /**
         * Calculates the distance from this vector to another given vector.
         * @param v2 A Vector2D instance.
         * @return Number The distance from this vector to the vector passed as a parameter.
         */
        dist(v2: Vector2D): number;
        /**
         * Calculates the distance squared from this vector to another given vector.
         * @param v2 A Vector2D instance.
         * @return Number The distance squared from this vector to the vector passed as a parameter.
         */
        distSQ(v2: Vector2D): number;
        /**
         * Adds a vector to this vector, creating a new Vector2D instance to hold the result.
         * @param v2 A Vector2D instance.
         * @return Vector2D A new vector containing the results of the addition.
         */
        add(v2: Vector2D): Vector2D;
        /**
         * Subtacts a vector to this vector, creating a new Vector2D instance to hold the result.
         * @param v2 A Vector2D instance.
         * @return Vector2D A new vector containing the results of the subtraction.
         */
        subtract(v2: Vector2D): Vector2D;
        /**
         * Multiplies this vector by a value, creating a new Vector2D instance to hold the result.
         * @param v2 A Vector2D instance.
         * @return Vector2D A new vector containing the results of the multiplication.
         */
        multiply(value: number): Vector2D;
        /**
         * Divides this vector by a value, creating a new Vector2D instance to hold the result.
         * @param v2 A Vector2D instance.
         * @return Vector2D A new vector containing the results of the division.
         */
        divide(value: number): Vector2D;
        /**
         * Indicates whether this vector and another Vector2D instance are equal in value.
         * @param v2 A Vector2D instance.
         * @return boolean True if the other vector is equal to this one, false if not.
         */
        equals(v2: Vector2D): boolean;
        /**
         * Sets / gets the x value of this vector.
         */
        set x(value: number);
        get x(): number;
        /**
         * Sets / gets the y value of this vector.
         */
        set y(value: number);
        get y(): number;
        /**
         * Generates a string representation of this vector.
         * @return String A description of this vector.
         */
        toString(): String;
    }
}
