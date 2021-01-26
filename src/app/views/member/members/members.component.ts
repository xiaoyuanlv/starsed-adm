import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MemberService } from "src/app/shared/services/member.service";
import { AuthService } from "../../../shared/services/auth.service";
import { DocumentChangeAction } from "@angular/fire/firestore";
import { Member } from "src/app/models/member.model";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  starArr: Array<Member> = [];

  user;
  member;
  MemberForm;

  color = "light";

  firstOne;
  lastVisible;

  selectedMember: Member = null;
  stardata: DocumentChangeAction<unknown>[] = [];
  starpgnum = 0;

  constructor(
    public authService: AuthService,
    private router: Router,
    public memberService: MemberService
  ) {
    
  }

  ngOnInit(): void {

    this.showMemberList();

    if (this.authService.isLoggedIn) {
      this.user = JSON.parse(localStorage.getItem("user") as string);
      this.getMemberInfo(this.user.uid);
    } else {
      this.router.navigate(["auth"]);
    }

  }

  getMemberInfo(id) {
    this.memberService.getInfo(id).subscribe((res) => {
      this.member = res.data() as Member;
    });
  }

  showMemberList() {
    this.starArr = [];
    this.stardata = [];
    this.lastVisible = null;
    this.starpgnum = 0;

    this.showList();
  }

  showList() {
    this.memberService.GetData(this.lastVisible).subscribe((data) => {
      if (data.length > 0) {
        this.starpgnum += 1;
        this.lastVisible = data[data.length - 1].payload.doc;
        this.firstOne = data[0].payload.doc;

        this.stardata = data;

        this.starArr = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Object),
          } as Member;
        });
      } 
    });
  }

}
