from manim import *

class HelloWorld(Scene):
    def construct(self):
        text = Text("Hello, Docker + Manim!")
        self.play(Write(text))
        self.wait(1)
