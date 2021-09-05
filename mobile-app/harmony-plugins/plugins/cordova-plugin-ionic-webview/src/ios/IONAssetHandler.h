#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>

@interface IONAssetHandler : NSObject <WKURLSchemeHandler>

@property (nonatomic, strong) NSString * basePath;
@property (nonatomic, strong) NSString * scheme;
@property (nonatomic, strong) NSString * customEntryPoint;

-(void)setAssetPath:(NSString *)assetPath;
-(void)updateBasePath:(NSString *)cordovaDataDirectoryUpdateDir;

- (instancetype)initWithBasePath:(NSString *)basePath andScheme:(NSString *)scheme andCustomEntryPoint:(NSString *)customEntryPoint;


@end
