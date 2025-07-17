
from manim import *

class HelloWorld(Scene):
    def construct(self):
        self.play(Write(Text('Hello World')))
