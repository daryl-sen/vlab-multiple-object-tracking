# \#1 Objects with high velocity

Objects with very high velocity are unable to reflect to the opposite direction... Not unlike in the real world.

The `.reflectVelocity()` method checks for values exceeding the normal collision boundary and converts the velocity for that axis to the opposite direction (i.e. 1 to -1, -1 to 1). The object then moves in that direction to 'recover' its coordinates back into the normal range.

When the velocity is too high, the object is unable to recover its coordinates in time, triggering another reflection before it gets back into the boundary.
