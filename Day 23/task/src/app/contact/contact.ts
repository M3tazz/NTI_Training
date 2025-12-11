import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-contact',
  imports: [Navbar],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  message: string = 'Hello from my Contact component!';
}
