import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user.model';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../service/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  user: User;
  @ViewChild('profileForm') profileForm: NgForm;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router,private sharedService: SharedService) { }

  ngOnInit() {
    console.log('registerrrrr');

    // the unaffected error when open this page " Cannot read property " is because this is a asynchronous call
    // before it came back , user is null. so user.userName is wrong
    // this.route.params.subscribe(
    //   (param: Params) => {
    //     this.id = param.uid;
    //     console.log(this.id);
    //     // this.user = this.userService.findUserById(this.id);
    //     this.userService.findUserById(this.id).subscribe(
    //       (data: User) => {
    //         console.log(data.userName);
    //         this.user = data;
    //       }
    //     );
    //   }
    // );

    this.getUser();
  }

  getUser() {
    this.user = this.sharedService.user;
  }


  logout() {
    this.userService.logOut()
      .subscribe(
        (data: any) => {
          console.log('back to cilent');
          this.router.navigate(['/login']);
        }
      );
  }

  toWebsite() {
    this.router.navigate(['/user', this.user._id, 'website']);
    // this.router.navigate(['user', this.id, 'website']);
  }

  save() {
    const userName = this.profileForm.value.userName;
    const email = this.profileForm.value.email;
    const firstName = this.profileForm.value.firstName;
    const lastName = this.profileForm.value.lastName;
   this.userService.updateUser(this.user._id, new User(this.user._id, userName, this.user.password, firstName, lastName, email)).
        subscribe(
            (data: User) => {
              alert( 'save successfully' );
            });
    this.router.navigate([], {relativeTo: this.route});
  }


  delete() {
    console.log('front start');
    this.userService.deleteUser(this.user._id)
      .subscribe(
        (data: any) => {
          console.log('front back')
          this.router.navigate(['/login']);
        }
      );
  }
}

