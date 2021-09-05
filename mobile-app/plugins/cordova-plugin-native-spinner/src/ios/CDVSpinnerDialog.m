//
//  CDVSpinnerDialog.m
//
//  Created by Domonkos Pál on 2014.01.27..
//
//

#import "CDVSpinnerDialog.h"

@interface CDVSpinnerDialog () {
    UIActivityIndicatorView *indicator;
    NSString *callbackId;
    NSString *title;
    NSString *message;
    NSNumber *isFixed;
    NSString *alpha;
    NSString *red;
    NSString *green;
    NSString *blue;
}

@property (nonatomic, retain) UIActivityIndicatorView *indicator;
@property (nonatomic, retain) UIView *overlay;
@property (nonatomic, retain) UILabel *messageView;


@end

@implementation CDVSpinnerDialog

@synthesize indicator = _indicator;
@synthesize overlay = _overlay;
@synthesize messageView = _messageView;

- (BOOL)isLandscape
{
 
    UIWindow *firstWindow = [[[UIApplication sharedApplication] windows] firstObject];
    if (firstWindow == nil) { return NO; }

    UIWindowScene *windowScene = firstWindow.windowScene;
    if (windowScene == nil){ return NO; }

    return UIInterfaceOrientationIsLandscape(windowScene.interfaceOrientation);
  
}
-(CGRect)rectForView {
    BOOL landscape = [self isLandscape];
    if(landscape){
        return CGRectMake( 0.0f, 0.0f, [UIScreen mainScreen].bounds.size.height, [[UIScreen mainScreen]bounds].size.width);
    }
    return CGRectMake( 0.0f, 0.0f, [[UIScreen mainScreen]bounds].size.width, [UIScreen mainScreen].bounds.size.height);
}

- (void)handleTapGesture:(UITapGestureRecognizer *)gesture
{
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [result setKeepCallbackAsBool:true];
    if (!isFixed.boolValue) {
        [result setKeepCallbackAsBool:false];
        [self hide];
    }
    [self.commandDelegate sendPluginResult:result callbackId:callbackId];
}

- (UIView *)overlay {
    if (!_overlay) {
        _overlay = [[UIView alloc] initWithFrame:self.rectForView];
        _overlay.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:[alpha floatValue]];
        _indicator = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleLarge];
        _indicator.center = _overlay.center;
        [_indicator startAnimating];
        [_overlay addSubview:_indicator];

        _messageView = [[UILabel alloc] initWithFrame: self.rectForView];
        [_messageView setText: message == nil ? title : message];
        [_messageView setTextColor: [UIColor colorWithRed:[red floatValue] green:[green floatValue] blue:[blue floatValue] alpha:0.65]];
        [_messageView setBackgroundColor: [UIColor colorWithRed:0 green:0 blue:0 alpha:0]];
        [_messageView setTextAlignment: NSTextAlignmentCenter];
        _messageView.center = (CGPoint){_overlay.center.x, _overlay.center.y + 40};
        _messageView.font = [UIFont fontWithName:@"Helvetica" size:(14.0)];
        _messageView.lineBreakMode = NSLineBreakByCharWrapping;
        _messageView.numberOfLines = 0;
        [_overlay addSubview:_messageView];

        UITapGestureRecognizer *tapRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handleTapGesture:)];
        [_overlay addGestureRecognizer: tapRecognizer];
    }
    return _overlay;
}


- (void) show:(CDVInvokedUrlCommand*)command {

    callbackId = command.callbackId;
    
    //If there is a loading mask yet we hide it
    [self hide];

    title = [command argumentAtIndex:0];
    message = [command argumentAtIndex:1];
    isFixed = [command argumentAtIndex:2];
    alpha = [command argumentAtIndex:3];
    red = [command argumentAtIndex:4];
    green = [command argumentAtIndex:5];
    blue = [command argumentAtIndex:6];
    
    UIViewController *rootViewController = [[[[UIApplication sharedApplication] delegate] window] rootViewController];

    [rootViewController.view addSubview:self.overlay];

}

- (void) hide:(CDVInvokedUrlCommand*)command {
    [self hide];
}

- (void) hide {
    if (_overlay) {
        [self.indicator stopAnimating];
        [self.indicator removeFromSuperview];
        [self.messageView removeFromSuperview];
        [self.overlay removeFromSuperview];
        _indicator = nil;
        _messageView = nil;
        _overlay = nil;
    }
}


#pragma mark - PRIVATE METHODS

@end
